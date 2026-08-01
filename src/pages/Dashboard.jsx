import KPISection from "../components/dashboard/KPISection";
import TrafficChart from "../components/dashboard/TrafficChart";
import ResourceUsage from "../components/dashboard/ResourceUsage";
import AlertsTable from "../components/dashboard/AlertsTable";

export default function Dashboard() {
  return (
    <div className="flex flex-wrap flex-1 p-2 justify-around bg-[#121212] min-h-screen text-white">
        <div className="flex-1 p-2 space-y-2">

        <KPISection />

        <TrafficChart />

        </div>
        <div className="flex-1 p-2 space-y-2">

          <ResourceUsage />


          <AlertsTable />

        </div>
    </div>
  );
}