import express from "express";
import {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} from "../controllers/books.controllers.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;