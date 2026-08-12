const EmptyState = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <p className="text-lg font-medium">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default EmptyState;