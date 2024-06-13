function getParams() {
  try {
    const paramsString = location.search.split("=")[1];
    return JSON.parse(decodeURIComponent(paramsString));
  } catch {
    return {};
  }
}
