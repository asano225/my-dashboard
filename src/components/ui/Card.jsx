export default function Card({ children, className, style }) {
  return (
    <div 
      style={style}
      className={`bg-[#1e1e1e] border border-[#444444] rounded-lg p-4 ${className}`}
    >
      {children}
    </div>
  );
}