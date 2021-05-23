import { useState } from "react";
import { toast } from "tailwind-toast";
import { validateEmail } from "../util/validateEmail";
import Button from "./button";

import Link from "next/link";
import { ReadSVG, EmailSVG } from "./svgs";
import Loader from "./loader";

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
  email,
}) {
  const [src, setSrc] = useState(bookImage);

  const [mailStatus, setMailStatus] = useState({
    sending: false,
  });

  const handleEmailSend = async () => {
    if (!validateEmail(email)) {
      toast()
        .default("⚠ Error", "Please check the email address")
        .with({
          shape: "sqaure",
          positionY: "bottom",
          color: "white",
          fontColor: "black",
        })
        .show();
      return;
    }
    setMailStatus({ sending: true });
    toast()
      .default("Sending e-book to", email)
      .with({
        shape: "sqaure",
        positionY: "bottom",
        color: "white",
        fontColor: "black",
      })
      .for(1000)
      .show();
    // const response = await fetch(
    //   `/api/send-mail/${btoa(download)}.epub?mail=${email}`
    // );
    let response;

    setTimeout(() => {
      response.ok = true;
    }, 2000);

    if (!response.ok) {
      toast()
        .default(response.status, "Failed to send mail")
        .with({
          shape: "sqaure",
          positionY: "bottom",
          color: "white",
          fontColor: "black",
        })
        .show();
      setMailStatus({ sending: false });
      return;
    }
    toast()
      .default(response.statusText, "Mail sent")
      .with({
        shape: "sqaure",
        positionY: "bottom",
        color: "white",
        fontColor: "black",
      })
      .show();
    setMailStatus({ sending: false });
  };

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
          <a href={`/api/dl/${btoa(download)}.epub`}>
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
            <div
              onClick={handleEmailSend}
              className="text-xs ml-3 mt-4 cursor-pointer hover:shadow-md"
            >
              {mailStatus.sending ? (
                <span className="w-6 h-6">
                  <Loader tailwindcss="w-6 h-6" />
                </span>
              ) : (
                <EmailSVG className="w-8 h-8 border border-black p-1.5 " />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
