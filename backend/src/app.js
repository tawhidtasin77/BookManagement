import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/books", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.use("/api/books", bookRoutes);

export default app;