import { useState } from "react";
import Checkbox from "./checkbox";
import EmailInput from "./emailInput";

export function Options({
  showKindleResults,
  setShowKindleResults,
  email,
  setEmail,
}: {
  showKindleResults: boolean;
  setShowKindleResults: (showKindleResults: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKindleChange = () => {
    setShowKindleResults(!showKindleResults);
  };

  return (
    <div className="flex flex-col w-full mt-4 max-w-md">
      <div
        className="border border-black w-full px-6 py-2 text-xs flex justify-between dark:border-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Options</span>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen && "rotate-180"
          }`}
        >
          &#x25BC;
        </span>
      </div>

      <div
        className={`px-6 pb-4 pt-3 bg-white dark:bg-gray-800 transition-all ease-in duration-200	border border-black ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Checkbox
          label="Kindle only (Kindle supported formats)"
          checked={showKindleResults}
          onChange={handleKindleChange}
        />

        {showKindleResults && (
          <EmailInput
            email={email}
            onEmailChange={(e) => setEmail(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
