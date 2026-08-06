import { useState } from "react";
import AlertFilters from "../components/alerts/AlertFilters";
import AlertSummary from "../components/alerts/AlertSummary";
import AlertTable from "../components/alerts/AlertTable";
import AlertDrawer from "../components/alerts/AlertDrawer";
import { dummyAlerts } from "../data/dummyAlerts";


export default function Alerts() {
  const [alerts] = useState(dummyAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [sevFilter, setSevFilter] = useState("All");

  const filteredAlerts = alerts.filter((item) => {
  const statusMatch =
    statusFilter === "All" || item.status === statusFilter;

  const sevMatch =
    sevFilter === "All" || item.severity === sevFilter;

  return statusMatch && sevMatch;
});

  return (
    <div className=" bg-[#121212] min-h-screen text-white">

      <AlertFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sevFilter={sevFilter}
        setSevFilter={setSevFilter}
      />

      <AlertSummary alerts={alerts} />

      <AlertTable alerts={filteredAlerts} onSelect={setSelectedAlert} />

      <AlertDrawer
        alert={selectedAlert}
        open={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}