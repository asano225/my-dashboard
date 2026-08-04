import { useState } from "react";
import AlertFilters from "../components/alerts/AlertFilters";
import AlertSummary from "../components/alerts/AlertSummary";
import AlertTable from "../components/alerts/AlertTable";
import AlertDrawer from "../components/alerts/AlertDrawer";
import { dummyAlerts } from "../data/dummyAlerts";


export default function Alerts() {
  const [alerts] = useState(dummyAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div className=" bg-[#0f0f0f] min-h-screen text-white">

      <AlertFilters />

      <AlertSummary alerts={alerts} />

      <AlertTable alerts={alerts} onSelect={setSelectedAlert} />

      <AlertDrawer
        alert={selectedAlert}
        open={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}