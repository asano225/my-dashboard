import { useState } from "react";
import AlertFilters from "../components/alerts/AlertFIlters";
import AlertSummary from "../components/alerts/AlertSummary";
import AlertTable from "../components/alerts/AlertTable";
import AlertDrawer from "../components/alerts/AlertDrawer";
import { dummyAlerts } from "../data/dummyAlerts";


export default function Alerts() {
  const [alerts, setAlerts] = useState(dummyAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div className="p-6 bg-[#0f0f0f] min-h-screen text-white">
      <h1 className="text-2xl font-semibold mb-4">🚨 Alerts</h1>

      <AlertFilters />

      <AlertSummary alerts={alerts} />

      <AlertTable alerts={alerts} onSelect={setSelectedAlert} />

      {selectedAlert && (
        <AlertDrawer
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
    </div>
  );
}