import { useEffect } from "react";
import ResultCard from "./ResultCard";

interface ResultCardListProps {
  results: any[];
  showKindleOnlyResults: boolean;
  email: string;
  setResults: (results: any[]) => void;
}

const ResultCardList = ({
  results,
  setResults,
  showKindleOnlyResults,
  email,
}: ResultCardListProps) => {
  const finalResults = showKindleOnlyResults
    ? results?.filter(
        (result) => result.extension === "mobi" || result.extension === "epub"
      )
    : results;

  useEffect(() => {
    if (results?.length > 0) {
      window.sessionStorage.setItem("results", JSON.stringify(results));
    }
  }, [results?.length]);

  useEffect(() => {
    const storedResults = window.sessionStorage.getItem("results");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, [setResults]);

  return (
    <div className="grid md:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-4 mx-auto justify-items-center max-w-6xl">
      {finalResults && finalResults !== null ? (
        finalResults.map((result) => (
          <ResultCard
            {...result}
            email={email}
            key={result.id}
            showKindleOnlyResults={showKindleOnlyResults}
          />
        ))
      ) : (
        <p className="text-center">No books found.</p>
      )}
    </div>
  );
};

export default ResultCardList;
