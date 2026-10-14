import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/books", bookRoutes);

export default app;