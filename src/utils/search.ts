import { log } from "node:console";
import { libgenConfig } from "./config";
import { getBookData } from "./getData";

export async function searchQuery(query: string) {
  const formattedQuery = query.split(" ").join("+");
  const finalLink = `${libgenConfig.url}${formattedQuery}`;

  let refinedData = [];

  try {
    const resp = await fetch(finalLink);
    const data = await resp.text();

    let fetchedData = libgenConfig.regex.exec(data);

    while (fetchedData != null) {
      refinedData.push(fetchedData[1]);
      fetchedData = libgenConfig.regex.exec(data);
    }
  } catch (err) {
    console.log(err);
  }

  console.log(refinedData);

  const res = await getBookData(refinedData);

  return res;
}
