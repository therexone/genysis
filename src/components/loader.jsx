const Loader = ({ loadingText, tailwindcss }) => {
  return (
    <div>
      <div className={`spinner ${tailwindcss}`}></div>
      {loadingText && <p className="text-xs text-gray-400">{loadingText}</p>}
    </div>
  );
};

export default Loader;
