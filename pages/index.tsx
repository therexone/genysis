import { Options } from "@/src/components/Options";
import { SearchForm } from "@/src/components/SearchForm";
import Loader from "@/src/components/loader";
import ResultCardList from "@/src/components/resultCardList";
import useLocalStorageState from "@/src/hooks/useLocalStorageState";
import { useEffect, useState } from "react";

export default function Home() {
  const [results, setResults] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);

  const [showKindleResults, setShowKindleResults] = useLocalStorageState(
    "showKindleResults",
    false
  );
  const [email, setEmail] = useLocalStorageState("email", "");

  const handleBookSearch = async (query: string) => {
    setLoading(true);
    setResults([]);
    try {
      window.sessionStorage.setItem("query", JSON.stringify(query));
      const res = await fetch(`/api/search/${query}`);
      const data = await res.json();
      setResults(data.books);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

        <SearchForm onSearch={handleBookSearch} />

        <Options
          showKindleResults={showKindleResults}
          setShowKindleResults={setShowKindleResults}
          email={email}
          setEmail={setEmail}
        />

        {loading && <Loader tailwindcss="h-8 w-8" loadingText="Searching..." />}
      </div>

      <ResultCardList
        setResults={setResults}
        results={results}
        showKindleOnlyResults={showKindleResults}
        email={email}
      />
    </>
  );
}
