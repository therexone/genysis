
const Loader = ({
  loadingText,
  tailwindcss,
}: {
  loadingText: string;
  tailwindcss: string;
}) => {
  return (
    <div>
      <div className={`spinner ${tailwindcss}`}></div>
      {loadingText && <p className="text-xs text-gray-400">{loadingText}</p>}
    </div>
  );
};

export default Loader;
