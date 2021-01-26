module.exports = {
  url: `http://libgen.li/search.php?req=`,
  regex: /bgcolor.+<td>(\d+)<\/td>/gm,
  dataUrl: `http://libgen.li/json.php?fields=id,Title,Author,MD5,coverurl,language,filesize,extension,year,publisher&ids=`,
  dlUrl: `http://31.42.184.140/main`, // id(rounded)/md5(lower)/Author - Title-Publisher (Year).extension
  coversUrl: `http://library.lol/covers/`,
};
