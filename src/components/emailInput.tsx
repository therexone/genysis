import { useMemo } from "react";
import { validateEmail } from "../utils/validateEmail";

type EmailInputProps = {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EmailInput = ({ email, onEmailChange }: EmailInputProps) => {
  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  return (
    <>
      <input
        type="email"
        className={`mt-2 w-full p-2 border ${
          isEmailValid
            ? "border-black dark:text-zinc-300 dark:border-zinc-500"
            : "border-rose-800 text-red-700 dark:text-rose-500"
        } max-w-md text-sm
          focus:border-black  dark:focus:border-zinc-400 
        `}
        placeholder="Enter kindle email"
        value={email}
        onChange={onEmailChange}
      />
    </>
  );
};

export default EmailInput;
