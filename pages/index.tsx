import Button from "@/src/components/button";
import Checkbox from "@/src/components/checkbox";
import EmailInput from "@/src/components/emailInput";
import Loader from "@/src/components/loader";
import ResultCardList from "@/src/components/resultCardList";
import useLocalStorageState from "@/src/hooks/useLocalStorageState";
import { useState, useEffect, FormEvent } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [showKindleResults, setShowKindleResults] = useLocalStorageState(
    "showKindleResults",
    false
  );
  const [enableReadingMode, setEnableReadingMode] = useLocalStorageState(
    "enableReadingMode",
    false
  );

  const [email, setEmail] = useLocalStorageState("email", "");

  const handleBookSearch = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setResults([]);
    e.preventDefault();
    try {
        window.sessionStorage.setItem("query", JSON.stringify(query));
        const res = await fetch(`/api/search/${query}`);
        const data = await res.json();
        console.log(data);
        setResults(data.books);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (results?.length > 0) {
      window.sessionStorage.setItem("results", JSON.stringify(results));
    }
  }, [results]);

  useEffect(() => {
    const results = window.sessionStorage.getItem("results");
    const query = window.sessionStorage.getItem("query");
    if (results) {
      setResults(JSON.parse(results));
    }
    if (query) {
      setQuery(JSON.parse(query));
    }
  }, []);

  return (
    <>
      <div
        className={`pt-10 mb-8 px-10 flex flex-col items-center dark:text-gray-50 ${
          results?.length === 0 && "home"
        }`}
      >
        <h1 className="text-4xl text-center dark:text-gray-50">Genysis</h1>
        <p className="text-gray-600 text-sm text-center mt-1 font-light dark:text-gray-200">
          Library Genesis Simplified
        </p>
        <form
          className="flex flex-col items-center w-5/6"
          onSubmit={handleBookSearch}
        >
          <input
            type="text"
            className="mt-10 w-full text-center p-2 border border-black max-w-md  dark:bg-gray-900 dark:border-gray-500"
            placeholder="Book title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button type="submit" title="Search Book" />
        </form>

        <div className="flex flex-col w-full mt-4 max-w-md ">
          <div
            className="border border-black  w-full px-6 py-2 text-xs flex justify-between dark:border-gray-500"
            onClick={() => setShowOptions(!showOptions)}
          >
            <span>Options</span>
            <span>&#x25BC;</span>
          </div>
          <div
            className={`px-6  pb-4 pt-3 bg-white dark:bg-gray-800 transition-all ease-in duration-200	border border-black  ${
              showOptions ? "block" : "hidden"
            }`}
          >
            <Checkbox
              label="Kindle only"
              checked={showKindleResults}
              onChange={() => setShowKindleResults(!showKindleResults)}
            />
            {showKindleResults && (
              <EmailInput
                email={email}
                onEmailChange={(e) => setEmail(e.target.value)}
              />
            )}

            <Checkbox
              label="Enable reading in browser (Experimental- epub only)"
              checked={enableReadingMode}
              onChange={() => setEnableReadingMode(!enableReadingMode)}
            />
          </div>
        </div>

        {loading && <Loader tailwindcss="h-8 w-8" loadingText="Searching..." />}
      </div>

      <ResultCardList
        results={results}
        enableReadingMode={enableReadingMode}
        showKindleOnlyResults={showKindleResults}
        email={email}
      />
    </>
  );
}
