const validUrl = (name) => {
  const url = name
    ?.toString()
    .replaceAll("-", "_")
    .replaceAll(" ", "_")
    .replaceAll(",", "_")
    .replaceAll("and", "_")
    .replaceAll("&", "_");
  return url;
};

export default validUrl;
