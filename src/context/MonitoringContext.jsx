import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { dummyData } from "../data/dummyDevice";
import { dummyAlerts } from "../data/dummyAlerts";

const MonitoringContext = createContext(null);

const SOCKET_URL = "http://localhost:3001";

export function MonitoringProvider({ children }) {
  const [rawDevices, setRawDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [history, setHistory] = useState({});
  const [lastUpdate, setLastUpdate] = useState("10:35:20");
  const [localIP, setLocalIP] = useState("127.0.0.1");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initial fetch from backend with fallback to dummyData
  useEffect(() => {
    fetch("/api/state")
      .then((res) => res.json())
      .then((data) => {
        if (data.devices && data.devices.length > 0) {
          setRawDevices(data.devices);
        } else {
          setRawDevices(dummyData);
        }
        if (data.alerts) setAlerts(data.alerts);
        if (data.history) setHistory(data.history);
        if (data.lastUpdate) setLastUpdate(data.lastUpdate);
        if (data.localIP) setLocalIP(data.localIP);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Could not connect to backend REST API, using local fallback:", err);
        setRawDevices(dummyData);
        setAlerts(dummyAlerts);
        setLoading(false);
      });

    // Real-time socket connection
    const socket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      timeout: 3000,
    });

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("metrics:update", (payload) => {
      if (payload.lastUpdate) setLastUpdate(payload.lastUpdate);
      if (payload.devices) setRawDevices(payload.devices);
      if (payload.alerts) setAlerts(payload.alerts);
      if (payload.history) setHistory(payload.history);
    });

    return () => socket.disconnect();
  }, []);

  // Format devices into the rich schema expected by my-dashboard components
  const devices = useMemo(() => {
    if (!rawDevices || rawDevices.length === 0) return dummyData;

    return rawDevices.map((d) => {
      // If item already has a .detail object from dummyData, preserve it
      if (d.detail && d.dev) {
        return d;
      }

      const devHistory = history[d.id] || [];
      const cpuHistory = devHistory.length > 0 ? devHistory.map((h) => h.cpu) : [d.cpu || 20];
      const memHistory = devHistory.length > 0 ? devHistory.map((h) => h.ram) : [d.ram || 40];
      const downloadHistory = devHistory.length > 0 ? devHistory.map((h) => h.download) : [d.download || 5];
      const uploadHistory = devHistory.length > 0 ? devHistory.map((h) => h.upload) : [d.upload || 2];

      const storageUsed = Number(d.storageUsed || 39.1);
      const storageFree = Number((100 - storageUsed).toFixed(1));

      return {
        id: d.id,
        host: d.host || "Unknown",
        dev: d.type || "PC",
        ip: d.ip || "0.0.0.0",
        group: d.group || "WJS",
        severity: d.severity || "Health",
        problem: d.problems > 0 ? d.problems : "-",
        status: d.status || "Available",
        mode: d.mode || "real",
        ports: d.ports || [80, 443],
        openPortStatus: d.openPortStatus,
        latency: d.latency || 2,
        hardware: d.hardware || null,
        detail: {
          user: d.host,
          hardware: d.hardware || null,
          cpu: {
            usage: d.cpu || 0,
            history: cpuHistory,
          },
          memory: {
            usage: d.ram || 0,
            history: memHistory,
          },
          network: {
            download: d.download || 0,
            upload: d.upload || 0,
            traffic: {
              download: downloadHistory,
              upload: uploadHistory,
            },
          },
          storage: {
            used: storageUsed,
            free: storageFree,
          },
          lastUpdate: lastUpdate,
        },
      };
    });
  }, [rawDevices, history, lastUpdate]);

  // Format alerts for my-dashboard
  const formattedAlerts = useMemo(() => {
    if (!alerts || alerts.length === 0) return dummyAlerts;

    return alerts.map((a, idx) => ({
      id: a.id || idx + 1,
      time: a.time || "10:00",
      device: a.host || a.device || "Unknown",
      ip: a.ip || a.ipAddress || "-",
      severity: a.status === "Solved" ? "Info" : (a.status || a.severity || "Warning"),
      status: a.resolved ? "Resolved" : "Active",
      message: a.problem || a.message || "Alert event triggered",
      problem: a.problemCount || 1,
      duration: a.duration || "00h 01m",
      rawAlert: a,
    }));
  }, [alerts]);

  // Aggregate KPI summary for Dashboard
  const kpiData = useMemo(() => {
    const total = devices.length;
    const online = devices.filter((d) => d.status === "Available" && d.severity === "Health").length;
    const warning = devices.filter((d) => d.severity === "Warning").length;
    const offline = devices.filter((d) => d.status === "Unavailable" || d.severity === "Critical").length;

    const availableDevs = devices.filter((d) => d.status === "Available");
    const avgCpu = availableDevs.length
      ? Math.round(availableDevs.reduce((acc, d) => acc + (d.detail?.cpu?.usage || 0), 0) / availableDevs.length)
      : 0;
    const avgRam = availableDevs.length
      ? Math.round(availableDevs.reduce((acc, d) => acc + (d.detail?.memory?.usage || 0), 0) / availableDevs.length)
      : 0;

    return {
      kpiCards: [
        { title: "Devices", value: total, color: "#4a7ff7" },
        { title: "Online", value: online, color: "#22c55e" },
        { title: "Warning", value: warning, color: "#f59e0b" },
        { title: "Offline", value: offline, color: "#ef4444" },
      ],
      avgCpu,
      avgRam,
      total,
      online,
      warning,
      offline,
    };
  }, [devices]);

  // Aggregate Traffic data for TrafficChart
  const trafficChartData = useMemo(() => {
    const firstDevId = rawDevices[0]?.id;
    const firstHist = firstDevId ? history[firstDevId] : [];
    if (!firstHist || firstHist.length === 0) {
      return [
        { time: "07:00", traffic: 300 },
        { time: "08:00", traffic: 450 },
        { time: "09:00", traffic: 600 },
        { time: "10:00", traffic: 350 },
      ];
    }

    return firstHist.slice(-25).map((pt, idx) => {
      let totalTraffic = 0;
      rawDevices.forEach((d) => {
        const hist = history[d.id] || [];
        const item = hist[hist.length - 25 + idx] || hist[hist.length - 1];
        if (item) {
          totalTraffic += (item.download || 0) + (item.upload || 0);
        }
      });
      return {
        time: pt.time,
        traffic: Number(totalTraffic.toFixed(1)),
      };
    });
  }, [rawDevices, history]);

  // Actions: Add, Edit, Delete Device
  const addDevice = async (newDevice) => {
    try {
      const res = await fetch("/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: newDevice.host,
          ip: newDevice.ip,
          type: newDevice.dev || newDevice.type || "PC",
          group: newDevice.group || "WJS",
          mode: newDevice.mode || "real",
          ports: newDevice.ports || "80, 443, 445",
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setRawDevices((prev) => [...prev, created]);
        return created;
      }
    } catch (e) {
      console.error("Failed to add device to backend:", e);
    }
  };

  const updateDevice = async (id, updatedFields) => {
    try {
      const res = await fetch(`/api/devices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) {
        const updated = await res.json();
        setRawDevices((prev) => prev.map((d) => (d.id === id ? updated : d)));
        return updated;
      }
    } catch (e) {
      console.error("Failed to update device on backend:", e);
    }
  };

  const deleteDevice = async (id) => {
    try {
      await fetch(`/api/devices/${id}`, { method: "DELETE" });
      setRawDevices((prev) => prev.filter((d) => d.id !== id && d.id !== Number(id)));
    } catch (e) {
      console.error("Failed to delete device on backend:", e);
      setRawDevices((prev) => prev.filter((d) => d.id !== id && d.id !== Number(id)));
    }
  };

  const resolveAlert = async (alertId) => {
    try {
      const res = await fetch(`/api/alerts/${alertId}/resolve`, { method: "POST" });
      if (res.ok) {
        const updated = await res.json();
        setAlerts((prev) => prev.map((a) => (a.id === alertId ? updated : a)));
      }
    } catch (e) {
      console.error("Failed to resolve alert:", e);
    }
  };

  return (
    <MonitoringContext.Provider
      value={{
        devices,
        rawDevices,
        history,
        alerts: formattedAlerts,
        rawAlerts: alerts,
        kpiData,
        trafficChartData,
        lastUpdate,
        localIP,
        connected,
        loading,
        addDevice,
        updateDevice,
        deleteDevice,
        resolveAlert,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
}

export function useMonitoring() {
  const context = useContext(MonitoringContext);
  if (!context) {
    throw new Error("useMonitoring must be used within a MonitoringProvider");
  }
  return context;
}
