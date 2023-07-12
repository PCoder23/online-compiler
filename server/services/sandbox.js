export const executeCode = async (snippet) => {
  snippet.output = "Hello World!";
  snippet.time = "100ms";
  return snippet;
};
