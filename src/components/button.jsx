export default function Button({ title, small = false, onClick, type }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 mt-4 bg-black hover:bg-white border border-black text-white hover:text-black ${
        small ? "text-xs" : "text-sm"
      } focus:border-black `}
    >
      {title}
    </button>
  );
}
