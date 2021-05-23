import { validateEmail } from "../util/validateEmail";
import { useMemo } from "react";

const EmailInput = ({ email, onEmailChange }) => {
  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  return (
    <>
      <input
        type="text"
        className={`mt-2 w-full p-1 border ${
          isEmailValid ? "border-black" : "border-red-800 text-red-700"
        } max-w-md text-sm`}
        placeholder="Enter kindle email"
        value={email}
        onChange={onEmailChange}
      />
    </>
  );
};

export default EmailInput;
