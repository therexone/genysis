const infoData = require("./data");
const getBookData = require("./getData");


async function searchQuery(query) {
  const formattedQuery = query.split(" ").join("+");
  const finalLink = `${infoData.url}${formattedQuery}`;
  let refinedData = [];

  const resp = await fetch(finalLink);
  const data = await resp.text();
  let fetchedData = infoData.regex.exec(data);
  while (fetchedData != null) {
    refinedData.push(fetchedData[1]);
    fetchedData = infoData.regex.exec(data);
  }
  const res = await getBookData(refinedData);
  return res;
}

module.exports = searchQuery;
