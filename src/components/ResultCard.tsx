import { useState } from "react";
import Button from "./button";
import toast, { Toaster } from "react-hot-toast";

import Loader from "./loader";
import { EmailSVG } from "./svgs";
import Image from "next/image";
import { validateEmail } from "../utils/validateEmail";

type ResultCardProps = {
  title: string;
  author: string;
  extension: string;
  language: string;
  filesize: string;
  bookImage: string;
  download: string;
  showKindleOnlyResults: boolean;
  email: string;
};

export default function ResultCard({
  title,
  author,
  extension,
  language,
  filesize,
  bookImage,
  download,
  showKindleOnlyResults,
  email,
}: ResultCardProps) {
  const [src, setSrc] = useState(bookImage);

  const [mailStatus, setMailStatus] = useState({
    sending: false,
  });

  const handleEmailSend = async () => {
    // if file is larger than 15 MB, don't send mail
    if (parseInt(filesize) > 15 * 1024 * 1024) {
      toast.error("Can't send files larger than 15 MB.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email");
      return;
    }
    setMailStatus({ sending: true });

    toast.dismiss("Sending mail...");

    const response = await fetch("/api/sendtomail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, downloadURL: download }),
    });

    if (response.status === 429) {
      toast.error("Too many requests. Try again later.");
      setMailStatus({ sending: false });
      return;
    }

    if (!response.ok) {
      toast.error("Something went wrong.");
      setMailStatus({ sending: false });
      return;
    }

    toast.success("Added to queue.", {
      icon: "✅",
    });
    setMailStatus({ sending: false });
  };

  const handleOnError = () => {
    setSrc("/placeholder-book.jpg");
  };

  return (
    <div className="mb-4 w-full max-w-lg max-h-64 overflow-hidden shadow-lg flex border border-black dark:border-zinc-400">
      <div className="w-1/3">
        <Image
          className="object-cover w-full h-full"
          src={src}
          alt={title}
          onError={handleOnError}
          referrerPolicy="no-referrer"
          width={200}
          height={300}
        />
      </div>

      <div className="flex-1 px-6 py-4 ">
        <h4 className="mb-2 text-sm font-regular tracking-tight leading-tight text-gray-800 title dark:text-zinc-100">
          {title}
        </h4>

        <p className="text-xs font-light text-gray-600 overflow-ellipsis line-clamp-2 dark:text-zinc-400">
          {author}
        </p>

        <p className="text-xs font-light text-gray-600 dark:text-zinc-400">
          .{extension}
        </p>
        <p className="text-xs font-light text-gray-600 dark:text-zinc-400">
          {language}
        </p>
        <p className="text-xs font-light text-gray-600 dark:text-zinc-400">
          {getReadableFileSize(parseInt(filesize))}
        </p>

        <div className="flex items-center">
          <a href={`/api/dl/${btoa(download)}`}>
            <Button title="Download" small />
          </a>

          {showKindleOnlyResults && (
            <div
              onClick={handleEmailSend}
              className="text-xs ml-3 mt-4 cursor-pointer hover:shadow-md"
            >
              {mailStatus.sending ? (
                <span className="w-6 h-6">
                  <Loader tailwindcss="w-6 h-6" loadingText="" />
                </span>
              ) : (
                <EmailSVG className="w-8 h-8 border border-black p-1.5 dark:border-zinc-400 dark:fill-zinc-400 " />
              )}
            </div>
          )}
        </div>
      </div>

      <Toaster
        toastOptions={{
          style: {
            borderRadius: 0,
            border: "1px solid #e4e4e7",
            background: "#333",
            color: "#ffffffe4",
          },
          success: {
            icon: "✅",
          },
          position: "bottom-center",
        }}
      />
    </div>
  );
}

const getReadableFileSize = (bytes: number) => {
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (bytes / Math.pow(1024, i)).toFixed(2) +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};
