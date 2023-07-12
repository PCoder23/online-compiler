import snippetModel from "../models/snippetsModel";
import { executeCode } from "../sandbox/sandbox";

export const fetchSnippet = async (req, res) => {
  const { id } = req.params;
  const oldSnippet = snippetModel.findById(id);
  if (!oldSnippet) return res.status(404).json({ message: "wrong id" });
  res.status(200).json(oldSnippet);
};

export const submitSnippet = async (req, res) => {
  const id = req.userId;
  const { code, language } = req.body;
  try {
    if (!id)
      return res
        .status(400)
        .json({ message: "Please login to submit a snippet" });
    const result = new snippetModel({
      code: code,
      language: language,
      output: output,
    });
    result = await executeCode(result);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reSubmitSnippet = async (req, res) => {
  res.send("Hello World");
};

export const deleteSnippet = async (req, res) => {
  res.send("Hello World");
};
