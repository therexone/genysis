import Head from "next/head";
import ResultCard from "../components/result-card";
import Button from "../components/button";
import { useState, useEffect } from "react";

export default function IndexPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleBookSearch = async (e) => {
    setLoading(true);
    setResults([]);
    e.preventDefault();
    window.sessionStorage.setItem("query", JSON.stringify(query));
    const res = await fetch(`/api/search/${query}`);
    const data = await res.json();
    setResults(data.books);
    setLoading(false);
  };

  useEffect(() => {
    if (results.length > 0) {
      window.sessionStorage.setItem("results", JSON.stringify(results));
    }
    console.log(results);
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
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className={`pt-10 mb-10 px-10 flex flex-col items-center ${
          results?.length === 0 && "home"
        }`}
      >
        <h1 className="text-4xl text-center">Genysis</h1>
        <p className="text-gray-600 text-sm text-center mt-1 font-light">
          Library Genesis Simplified
        </p>
        <form
          className="flex flex-col items-center w-5/6"
          onSubmit={handleBookSearch}
        >
          <input
            type="text"
            className="mt-10 w-full text-center p-2 border border-black"
            placeholder="Book title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button type="submit" title="Search Book" />
        </form>
        {loading && (
          <div>
            <div className="spinner"></div>
            <p className="text-xs text-gray-400">Searching...</p>
          </div>
        )}
      </div>
      <div className="flex-col px-4">
        {results && results !== null ? (
          results.map((result) => <ResultCard {...result} key={result.id} />)
        ) : (
          <p className="text-center">No books found.</p>
        )}
      </div>
    </>
  );
}
