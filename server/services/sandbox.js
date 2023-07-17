import util from "util";
import { exec } from "child_process";
import fs from "fs";

const executeCode = async (snippet) => {
  const output = await executeCodeAsync(snippet.language, snippet.code);
  snippet.output = output;
  snippet.executionTime = 100;
  return snippet;
};

const executeCodeAsync = async (language, code) => {
  const imageMap = {
    python: "python",
    javascript: "node",
  };

  const containerMap = {
    python: "python:latest",
    javascript: "node:latest",
  };

  const extensionMap = {
    python: "py",
    javascript: "js",
  };

  const filename = `code.${extensionMap[language]}`;
  const containerWorkingDir = "/work";

  const commandMap = {
    python: `python ${containerWorkingDir}/${filename}`,
    javascript: `node ${containerWorkingDir}/${filename}`,
  };

  const command = commandMap[language];

  const codeWithWrapper = code;

  fs.writeFileSync(filename, codeWithWrapper);

  const dockerRunCommand = `docker run --rm -v "${process.cwd()}:${containerWorkingDir}" -w ${containerWorkingDir} ${
    containerMap[language]
  } ${command}`;

  const execAsync = util.promisify(exec);

  try {
    const { stdout } = await execAsync(dockerRunCommand);
    console.log(`Output for ${language}:`);
    console.log(stdout);
    fs.unlinkSync(filename);
    return stdout;
  } catch (error) {
    console.error(`Error for ${language}:`);
    console.error(error.stderr);
    fs.unlinkSync(filename);
    throw error.stderr;
  }
};

export { executeCode };
