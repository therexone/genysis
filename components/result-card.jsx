import Button from "./button";
import { useState } from "react";

export default function ResultCard({
  title,
  author,
  extension,
  language,
  filesize,
  bookImage,
  download,
}) {
  const [src, setSrc] = useState(bookImage);

  const handleOnError = () => {
    setSrc("/placeholder-book.jpg");
  };

  console.log(download);

  return (
    <div className="mb-4 w-full max-w-lg max-h-56 overflow-hidden shadow-lg flex border border-black">
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
        <h4 className="mb-2 text-sm font-regular tracking-tight leading-tight text-gray-800 title">
          {title}
        </h4>
        <p className="text-xs font-light text-gray-600 overflow-ellipsis">
          {author}
        </p>
        <p className="text-xs font-light text-gray-600">{extension}</p>
        <p className="text-xs font-light text-gray-600">{language}</p>
        <p className="text-xs font-light text-gray-600">{filesize}</p>

        <a href={download}>
          <Button title="Download Book" small />
        </a>
      </div>
    </div>
  );
}
