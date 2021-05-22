import React from "react";
import ResultCard from "./result-card";

const ResultCardList = ({
  results,
  enableReadingMode,
  showKindleOnlyResults,
}) => {
  const finalResults = showKindleOnlyResults
    ? results?.filter((result) => result.extension === "mobi")
    : results;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-4 mx-auto justify-items-center max-w-6xl">
      {finalResults && finalResults !== null ? (
        finalResults.map((result) => (
          <ResultCard
            {...result}
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
