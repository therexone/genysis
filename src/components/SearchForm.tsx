import { useState, FormEvent, useEffect } from "react";
import Button from "./button";

export function SearchForm({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  useEffect(() => {
    const storedQuery = window.sessionStorage.getItem("query");
    if (storedQuery) {
      setQuery(JSON.parse(storedQuery));
    }
  }, []);

  return (
    <form
      className="flex flex-col items-center w-5/6"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        className="mt-10 w-full text-center p-2 border border-black max-w-md dark:border-zinc-600"
        placeholder="Book title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Button type="submit" title="Search Book" />
    </form>
  );
}
