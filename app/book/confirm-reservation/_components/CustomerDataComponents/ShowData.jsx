export const ShowData = ({ label, value, className = "" }) => {
  return (
    <div
      className={`h-12 px-3 border border-gray-200 rounded-md flex flex-col items-start justify-center ${className}`}
    >
      <label className="text-gray-500 text-xs leading-tight truncate w-full">
        {label}
      </label>
      <span className="text-md text-gray-900 truncate w-full">
        {value || "-"}
      </span>
    </div>
  );
};
