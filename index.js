import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Lele Web Server" });
});

app.listen(PORT, () => {
  console.log(`Server listening in port: ${PORT}`);
});
