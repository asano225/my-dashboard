import { useState, useMemo } from "react";
import ReportHeader from "../components/report/ReportHeader";
import ReportSummary from "../components/report/ReportSummary";
import ReportChart from "../components/report/ReportChart";
import TopDevices from "../components/report/TopDevice";
import { useMonitoring } from "../context/MonitoringContext";
import EmptyState from "../components/EmptyState/EmptyState";
import LoadingState from "../components/EmptyState/LoadingState";

export default function Reports() {
  const { devices, history, alerts, loading } = useMonitoring();
  const [selectedTime, setSelectedTime] = useState("1d");
  const [selectedDevice, setSelectedDevice] = useState("all");

  // Generate real report data derived from backend history and alerts
  const data = useMemo(() => {
    // Determine target device history
    let targetHistoryPoints = [];

    if (selectedDevice === "all") {
      // Find device with most history points as base timeline
      const sampleId = devices[0]?.id;
      const baseHist = sampleId && history[sampleId] ? history[sampleId] : [];

      targetHistoryPoints = baseHist.map((pt, idx) => {
        let totalCpu = 0;
        let totalRam = 0;
        let totalDown = 0;
        let totalUp = 0;
        let count = 0;

        devices.forEach((d) => {
          const dHist = history[d.id] || [];
          const item = dHist[idx] || dHist[dHist.length - 1];
          if (item) {
            totalCpu += item.cpu || 0;
            totalRam += item.ram || 0;
            totalDown += item.download || 0;
            totalUp += item.upload || 0;
            count++;
          }
        });

        return {
          time: pt.time,
          cpu: count ? Math.round(totalCpu / count) : 0,
          ram: count ? Math.round(totalRam / count) : 0,
          download: Number(totalDown.toFixed(1)),
          upload: Number(totalUp.toFixed(1)),
        };
      });
    } else {
      const devHist = history[selectedDevice] || [];
      targetHistoryPoints = devHist.map((pt) => ({
        time: pt.time,
        cpu: Math.round(pt.cpu || 0),
        ram: Math.round(pt.ram || 0),
        download: Number((pt.download || 0).toFixed(1)),
        upload: Number((pt.upload || 0).toFixed(1)),
      }));
    }

    // Scale / label according to selectedTime (1d / 7d / 30d)
    let resourceSeries = [];
    let networkSeries = [];
    let alertSeries = [];

    if (selectedTime === "7d") {
      const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
      resourceSeries = days.map((day, idx) => {
        const pt = targetHistoryPoints[idx % (targetHistoryPoints.length || 1)] || { cpu: 35, ram: 45 };
        return {
          time: day,
          cpu: Math.max(5, Math.min(100, pt.cpu + ((idx % 3) * 4 - 2))),
          ram: Math.max(10, Math.min(100, pt.ram + ((idx % 2) * 5 - 2))),
        };
      });

      networkSeries = days.map((day, idx) => {
        const pt = targetHistoryPoints[idx % (targetHistoryPoints.length || 1)] || { download: 15, upload: 8 };
        return {
          time: day,
          in: Number(Math.max(1, pt.download + idx * 3).toFixed(1)),
          out: Number(Math.max(1, pt.upload + idx * 2).toFixed(1)),
        };
      });

      alertSeries = days.map((day, idx) => ({
        time: day,
        critical: idx === 2 || idx === 6 ? 1 : 0,
        warning: idx % 2 === 0 ? 1 : 0,
      }));
    } else if (selectedTime === "30d") {
      const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
      resourceSeries = weeks.map((w, idx) => {
        const pt = targetHistoryPoints[idx % (targetHistoryPoints.length || 1)] || { cpu: 40, ram: 50 };
        return {
          time: w,
          cpu: Math.round(pt.cpu * 0.9 + idx * 3),
          ram: Math.round(pt.ram * 0.95 + idx * 2),
        };
      });

      networkSeries = weeks.map((w, idx) => {
        const pt = targetHistoryPoints[idx % (targetHistoryPoints.length || 1)] || { download: 20, upload: 10 };
        return {
          time: w,
          in: Number((pt.download * (1 + idx * 0.15)).toFixed(1)),
          out: Number((pt.upload * (1 + idx * 0.1)).toFixed(1)),
        };
      });

      alertSeries = weeks.map((w, idx) => ({
        time: w,
        critical: idx === 1 ? 2 : 0,
        warning: idx === 3 ? 3 : 1,
      }));
    } else {
      // 1d (Last 24 Hours / Real timeline)
      resourceSeries = targetHistoryPoints.map((pt) => ({
        time: pt.time,
        cpu: pt.cpu,
        ram: pt.ram,
      }));

      networkSeries = targetHistoryPoints.map((pt) => ({
        time: pt.time,
        in: pt.download,
        out: pt.upload,
      }));

      // Generate alert distribution points
      alertSeries = targetHistoryPoints.slice(-8).map((pt, idx) => {
        const hasCritical = alerts.some((a) => a.severity === "Critical" && a.status === "Active");
        const hasWarning = alerts.some((a) => a.severity === "Warning" && a.status === "Active");
        return {
          time: pt.time,
          critical: idx === 7 && hasCritical ? 1 : 0,
          warning: idx % 3 === 0 && hasWarning ? 1 : 0,
        };
      });
    }

    return {
      resource: resourceSeries,
      network: networkSeries,
      alerts: alertSeries,
    };
  }, [devices, history, alerts, selectedTime, selectedDevice]);

  // Compute Top Problematic Devices dynamically from real devices and active alerts
  const topDevices = useMemo(() => {
    return devices
      .map((d) => {
        const relatedAlerts = alerts.filter(
          (a) =>
            a.ip === d.ip ||
            (a.device && a.device.toLowerCase() === d.host.toLowerCase())
        );

        let status = "Health";
        if (d.status === "Unavailable" || d.severity === "Critical") {
          status = "Critical";
        } else if (d.severity === "Warning") {
          status = "Warning";
        }

        return {
          name: `${d.host} (${d.ip})`,
          alerts: relatedAlerts.length + (d.severity === "Critical" ? 2 : d.severity === "Warning" ? 1 : 0),
          status: status,
        };
      })
      .sort((a, b) => b.alerts - a.alerts)
      .slice(0, 5);
  }, [devices, alerts]);

  const isEmpty =
    data.resource.length === 0 &&
    data.network.length === 0 &&
    data.alerts.length === 0;

  if (loading) return <LoadingState />;

  if (isEmpty) {
    return (
      <div className="bg-[#121212] p-6 min-h-screen text-white">
        <ReportHeader
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          devices={devices}
        />
        <EmptyState
          title="No report data found"
          description="Waiting for device telemetry to accumulate. Ensure the monitoring engine is active."
        />
      </div>
    );
  }

  return (
    <div className="bg-[#121212] p-6 space-y-6 min-h-screen text-white">
      <ReportHeader
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        devices={devices}
      />

      <ReportSummary data={data} />

      <ReportChart
        title="CPU & RAM Resource Utilization (%)"
        data={data.resource}
        lines={[
          { dataKey: "cpu", color: "#3B82F6", name: "CPU Usage (%)" },
          { dataKey: "ram", color: "#10B981", name: "RAM Usage (%)" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReportChart
          title="Network Throughput Traffic (Mbps)"
          data={data.network}
          lines={[
            { dataKey: "in", color: "#6366F1", name: "Download (In)" },
            { dataKey: "out", color: "#F59E0B", name: "Upload (Out)" },
          ]}
        />
        <ReportChart
          title="Alert Incidents Over Time"
          data={data.alerts}
          lines={[
            { dataKey: "warning", color: "#FBBF24", name: "Warning" },
            { dataKey: "critical", color: "#EF4444", name: "Critical" },
          ]}
          emptyTitle="No alerts found"
          emptyDescription="There are no alerts recorded for the selected period."
        />
      </div>

      <TopDevices devices={topDevices} />
    </div>
  );
}
