const Loader = ({
  loadingText,
  tailwindcss,
}: {
  loadingText: string;
  tailwindcss: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="25 25 50 50"
        className={
          "spinner stroke-gray-500 dark:stroke-zinc-400" +
          (tailwindcss ? " " + tailwindcss : "")
        }
      >
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
      {loadingText && (
        <p className="text-xs text-gray-400 dark:text-zinc-500 mt-2">
          {loadingText}
        </p>
      )}
    </div>
  );
};

export default Loader;
