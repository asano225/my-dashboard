import Card from "../ui/Card";

export default function ReportChart({ title, subtitle, children }) {
  return (
    <Card className="p-4">
      
      <h2 className="text-lg font-semibold mb-1">
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-400 text-sm mb-4">
          {subtitle}
        </p>
      )}

      <div className="h-56 flex items-center justify-center text-gray-500">
        {children}
      </div>

    </Card>
  );
}