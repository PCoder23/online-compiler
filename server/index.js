import { createServer } from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import UserRoutes from "./Routes/UserRoutes.js";
import snippetRoutes from "./Routes/SnippetRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const server = createServer(app);
const port = process.env.PORT || 5000;

app.use("/api/auth", UserRoutes);
app.use("/api/snippet", snippetRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(port, (req, res) => {
      console.log("Server is running on port" + port);
    });
  })
  .catch((err) => console.log(err));
