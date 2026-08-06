import ReportHeader from "../components/report/ReportHeader";
import ReportSummary from "../components/report/ReportSummary";
import ReportChart from "../components/report/ReportChart";
import TopDevices from "../components/report/TopDevice";

export default function Reports() {
  return (
    <div className="bg-[#121212] p-6 space-y-6 min-h-screen text-white">
      
      <ReportHeader />

      <ReportSummary />

      <ReportChart 
        title="Resource Usage Over Time"
        subtitle="CPU & RAM usage"
      >
        Chart CPU & RAM
      </ReportChart>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReportChart 
          title="Network Traffic"
        >
          Network Chart
        </ReportChart>
        <ReportChart 
          title="Alerts Distribution"
        >
          Alert Chart
        </ReportChart>
      </div>

      <TopDevices />

    </div>
  );
}