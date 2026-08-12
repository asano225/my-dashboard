const ErrorState = ({ message }) => {
  return (
    <div className="text-center py-10 text-red-400">
      <p>{message || "Something went wrong"}</p>
    </div>
  );
};

export default ErrorState;