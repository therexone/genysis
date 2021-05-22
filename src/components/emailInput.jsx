const EmailInput = ({ email, onEmailChange}) => {
  return (
    <input
      type="text"
      className="mt-2 w-full text-center p-1 border border-black max-w-md text-sm"
      placeholder="Enter kindle email"
      value={email}
      onChange={onEmailChange}
    />
  );
};

export default EmailInput;
