import ReportHeader from "../components/report/ReportHeader";
import ReportSummary from "../components/report/ReportSummary";
import ReportChart from "../components/report/ReportChart";
import TopDevices from "../components/report/TopDevice";
import { useState } from "react";
import { mockData } from "../data/mockData";

export default function Reports() {
  const [selectedTime, setSelectedTime] = useState("7d");
  const [selectedDevice, setSelectedDevice] = useState("all");

  const data = mockData[selectedTime]?.[selectedDevice] || {
    resource: [],
    network: [],
    alerts: []
  };

  const topDevices = Object.entries(mockData[selectedTime]).map(
  ([name, deviceData]) => {
    const totalAlerts = deviceData.alerts.reduce(
      (sum, d) => sum + d.critical + d.warning,
      0
    );

    return {
      name,
      alerts: totalAlerts,
      status: totalAlerts > 20 ? "Critical" : "Warning"
    };
  }
).sort((a, b) => b.alerts - a.alerts);


  return (
    <div className="bg-[#121212] p-6 space-y-6 min-h-screen text-white">
      
      <ReportHeader
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />

      <ReportSummary data={ data }/>

      <ReportChart
        title="CPU & RAM Usage"
        data={data.resource}
        lines={[
          { dataKey: "cpu", color: "#3B82F6" },
          { dataKey: "ram", color: "#10B981" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReportChart
          title="Network Traffic"
          data={data.network}
          lines={[
            { dataKey: "in", color: "#6366F1" },
            { dataKey: "out", color: "#F59E0B" },
          ]}
        />
        <ReportChart
          title="Alerts Over Time"
          data={data.alerts}
          lines={[
            { dataKey: "warning", color: "#FBBF24" },
            { dataKey: "critical", color: "#EF4444" },
          ]}
        />
      </div>

      <TopDevices devices={topDevices} />

    </div>
  );
}