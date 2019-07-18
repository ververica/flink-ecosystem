// The error messagse from Joi are not quite a "joy" to parse. :(
export const parseError = error => {
  const firstBracket = error.indexOf("[");
  const lastBracket = error.lastIndexOf("]");
  const message = error.slice(firstBracket + 1, lastBracket) || "";
  const match = message.match(/"(.*?)"/) || [];
  const id = match[1];

  return { id, message };
};
