import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database";
import greetings from "./routes/greetings";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.listen(PORT);

app.get("/api", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Lele Web Greetings Server" });
});

app.use("/api/greetings", greetings);
