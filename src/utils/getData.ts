import { libgenConfig } from "./config";

const { dataUrl, dlUrl, coversUrl } = libgenConfig;

export async function getBookData(ids: string[]) {
  if (!ids.length) return null;

  const idsString = ids.join(",");

  let finalLink = `${dataUrl}${idsString}`;

  const res = await fetch(finalLink);
  console.log(res);
  const data = await res.json();

  if (data.error) {
    return null;
  }

  return data.map((el: Record<string, any>) => ({
    download: fixedEncodeURI(
      `${dlUrl}/${Math.floor(el.id / 1000) * 1000}/${el.md5.toLowerCase()}/${
        el.author
      } - ${el.title}-${el.publisher} (${el.year}).${el.extension}`
    )
      .replace(/(?<=:.*)[:;]/g, "_")
      .replace(/,/g, "%2C"),
    bookImage: `${coversUrl}${el.coverurl}`,
    filesize:
      el.filesize % 1048576 > 0
        ? (el.filesize / 1048576).toFixed(2) + "MB"
        : el.filesize % 1024 > 0
        ? (el.filesize / 1024).toFixed(2) + "KB"
        : el.filesize.toFixed(2) + "Bytes",
    ...el,
  }));
}

function fixedEncodeURI(str: string) {
  return encodeURI(str).replace(/[!'()* ]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}
