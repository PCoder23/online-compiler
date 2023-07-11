import { createServer } from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);
const port = process.env.PORT || 5000;

app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(port, (req, res) => {
      console.log("Server is running on port" + port);
    });
  })
  .catch((err) => console.log(err));
