import fs from "fs";
import http from "http";
import https from "https";
import { basename } from "path";
import { URL } from "url";
import { log } from "winston";

const TIMEOUT = 50000;

async function download(url: string): Promise<string> {
  const uri = new URL(url);

  const finalDest = "download/" + decodeURI(basename(uri.pathname));
  // Create the directory if it doesn't exist
  fs.mkdirSync("download", { recursive: true });

  if (fs.existsSync(finalDest)) {
    log("info", `File already exists: ${finalDest}`);
    console.log(`File already exists: ${finalDest}`);
    return Promise.resolve(finalDest);
  }

  const pkg = url.toLowerCase().startsWith("https:") ? https : http;

  return new Promise((resolve, reject) => {
    const request = pkg.get(uri.href).on("response", (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(finalDest, { flags: "wx" });

        res
          .on("end", () => {
            file.end();
            console.log(`${uri.pathname} downloaded to: ${finalDest}`);
            resolve(finalDest);
          })
          .on("error", (err) => {
            file.destroy();
            fs.unlink(finalDest, () => reject(err));
          })
          .pipe(file);
      } else if (res.statusCode === 302 || res.statusCode === 301) {
        // Recursively follow redirects, only a 200 will resolve.
        download(res.headers.location ?? "").then((path) => resolve(path));
      } else {
        reject(
          new Error(
            `Download request failed, response status: ${res.statusCode} ${res.statusMessage}`
          )
        );
      }
    });

    request.setTimeout(TIMEOUT, () => {
      request.destroy();
      reject(new Error(`Request timeout after ${TIMEOUT / 1000.0}s`));
    });
  });
}

export default download;
