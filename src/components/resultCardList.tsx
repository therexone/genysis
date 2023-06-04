import React from "react";
import ResultCard from "./result-card";

interface ResultCardListProps {
  results: any[];
  enableReadingMode: boolean;
  showKindleOnlyResults: boolean;
  email: string;
}

const ResultCardList = ({
  results,
  enableReadingMode,
  showKindleOnlyResults,
  email,
}: ResultCardListProps) => {
  const finalResults = showKindleOnlyResults
    ? results?.filter(
        (result) => result.extension === "mobi" || result.extension === "epub"
      )
    : results;

  return (
    <div className="grid md:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-4 mx-auto justify-items-center max-w-6xl">
      {finalResults && finalResults !== null ? (
        finalResults.map((result) => (
          <ResultCard
            {...result}
            email={email}
            key={result.id}
            enableReadingMode={enableReadingMode}
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
