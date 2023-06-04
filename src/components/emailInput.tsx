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
        className={`mt-2 w-full p-1 border ${
          isEmailValid
            ? "border-black dark:text-gray-600"
            : "border-red-800 text-red-700"
        } max-w-md text-sm`}
        placeholder="Enter kindle email"
        value={email}
        onChange={onEmailChange}
      />
    </>
  );
};

export default EmailInput;
