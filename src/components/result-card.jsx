import Button from "./button";
import { useState } from "react";
import Link from "next/link";
import { ReadSVG, EmailSVG } from "./svgs";

export default function ResultCard({
  title,
  author,
  extension,
  language,
  filesize,
  bookImage,
  download,
  enableReadingMode,
  showKindleOnlyResults,
}) {
  const [src, setSrc] = useState(bookImage);

  const handleOnError = () => {
    setSrc("/placeholder-book.jpg");
  };

  return (
    <div className="mb-4 w-full max-w-lg max-h-64 overflow-hidden shadow-lg flex border border-black dark:border-gray-500">
      <div className="w-1/3">
        <img
          className="object-cover w-full h-full"
          src={src}
          alt={title}
          onError={handleOnError}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex-1 px-6 py-4 ">
        <h4 className="mb-2 text-sm font-regular tracking-tight leading-tight text-gray-800 title dark:text-gray-100">
          {title}
        </h4>
        <p className="text-xs font-light text-gray-600 overflow-ellipsis line-clamp-2">
          {author}
        </p>
        <p className="text-xs font-light text-gray-600">{extension}</p>
        <p className="text-xs font-light text-gray-600">{language}</p>
        <p className="text-xs font-light text-gray-600">{filesize}</p>

        <div className="flex items-center">
          <a href={download}>
            <Button title="Download" small />
          </a>
          {enableReadingMode && extension == "epub" && (
            <Link
              href={{
                pathname: `reader/${btoa(download)}.epub`,
                query: { title },
              }}
            >
              <a className="text-xs ml-3 mt-4">
                <ReadSVG className="w-8 h-8 border border-black p-1.5" />
              </a>
            </Link>
          )}
          {showKindleOnlyResults && (
            <a className="text-xs ml-3 mt-4">
              <EmailSVG className="w-8 h-8 border border-black p-1.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
