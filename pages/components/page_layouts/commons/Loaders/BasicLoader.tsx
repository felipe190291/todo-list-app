export default function BasicLoader({ className }: { className?: string }) {
  return (
    <div className={`${className} w-full flex justify-center items-center`}>
      <div className="flex">
        <div className="dot animate-dot1"></div>
        <div className="dot animate-dot2"></div>
        <div className="dot animate-dot3"></div>
      </div>
    </div>
  );
}
