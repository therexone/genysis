const { dataUrl, dlUrl, coversUrl } = require("./data");

async function getBookData(ids) {
  let niceIds = ids.join(",");
  let finalLink = `${dataUrl}${niceIds}`;
  const res = await fetch(finalLink);
  const data = await res.json();

  if (data.error) {
    return null;
  }

  data.forEach((el) => {
    el.download = fixedEncodeURI(`${dlUrl}/${
      Math.floor(el.id / 1000) * 1000
    }/${el.md5.toLowerCase()}/${el.author} - ${el.title}-${el.publisher} (${
      el.year
    }).${el.extension}`).replace(/(?<=:.*)[:;]/g, "_").replace(/,/g, "%2C");
    el.bookImage = `${coversUrl}${el.coverurl}`;
    if (el.filesize % 1048576 > 0) {
      el.filesize = (el.filesize / 1048576).toFixed(2) + "MB";
    } else if (el.filesize % 1024 > 0) {
      el.filesize = (el.filesize / 1024).toFixed(2) + "KB";
    } else {
      el.filesize = el.filesize.toFixed(2) + "Bytes";
    }
    delete el.coverurl;
    delete el.md5;
    delete el.publisher;
    delete el.year;
  });
  return data;
}

function fixedEncodeURI(str) {
  return encodeURI(str).replace(/[!'()* ]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}

module.exports = getBookData;


