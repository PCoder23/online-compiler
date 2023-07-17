import snippetModel from "../models/snippetsModel.js";
import { executeCode } from "../services/sandbox.js";

export const fetchSnippet = async (req, res) => {
  if (!id) return res.status(400).json({ message: "Not authorized" });
  const { id } = req.params;
  const oldSnippet = snippetModel.findById(id);
  if (!oldSnippet) return res.status(404).json({ message: "wrong id" });
  res.status(200).json(oldSnippet);
};

export const submitSnippet = async (req, res) => {
  const { code, language } = req.body;
  console.log(1);
  try {
    console.log(2);
    var result = new snippetModel({
      code: code,
      language: language,
    });
    console.log(3);
    result = await executeCode(result);
    console.log(4);
    return res.status(201).json(result);
    console.log(5);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reSubmitSnippet = async (req, res) => {
  if (!id) return res.status(400).json({ message: "Not authorized" });
  res.send("Hello World");
};

export const deleteSnippet = async (req, res) => {
  if (!id) return res.status(400).json({ message: "Not authorized" });
  res.send("Hello World");
};
