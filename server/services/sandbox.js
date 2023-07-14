export const executeCode = async (snippet) => {
  snippet.output = "Hello World!";
  snippet.executionTime = 100;
  return snippet;
};
