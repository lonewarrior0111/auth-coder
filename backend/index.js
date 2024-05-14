import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/Db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
const PORT = process.env.PORT;

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
