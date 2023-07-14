import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (userModel.findOne({ email: req.body.email }))
      return res.status(400).json({ message: "User already exists" });
    if (!email || !password)
      return res.status(400).json({ message: "Please fill all the fields" });

    const oldUser = await userModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    if (!bcrypt.compare(password, oldUser.password))
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "100h",
    });
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name)
      return res.status(400).json({ message: "Please fill all the fields" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password should be atleast 6 characters long" });
    const oldUser = await userModel.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new userModel({ name, email, password: hashedPassword });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, {
      expiresIn: "100h",
    });

    await newUser.save();

    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
