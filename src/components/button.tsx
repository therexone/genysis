export default function Button({
  title,
  small = false,
  onClick,
  type = "button",
}: {
  title: string;
  small?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 mt-4 bg-black hover:bg-white border border-black text-white hover:text-black ${
        small ? "text-xs" : "text-sm"
      } focus:border-black dark:bg-zinc-900 dark:border-zinc-400 dark:text-zinc-100 `}
    >
      {title}
    </button>
  );
}
