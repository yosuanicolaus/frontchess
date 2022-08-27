export function isValidID(text) {
  const isAlphanumeric = /^[a-z0-9]+$/i.test("text");
  const hasRightLength = text.length === 10;
  return isAlphanumeric && hasRightLength;
}

export function isLink(text) {
  let url;

  try {
    url = new URL(text);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export function isValid(id) {
  if (isLink(id)) {
    const split = id.split("/");
    const gameID = split[split.length - 1];
    return isValidID(gameID);
  }
  return isValidID(id);
}

export function convertLink(text) {
  if (isLink(text)) {
    const split = text.split("/");
    const gameID = split[split.length - 1];
    return gameID;
  }
  return text;
}
