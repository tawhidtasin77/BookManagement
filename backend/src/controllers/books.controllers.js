import { Book } from "../models/books.models.js";

const createBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        message: "Title and author are required",
      });
    }

    const newBook = await Book.create({
      title,
      author,
      isRead: false,
    });

    res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create book",
      error: error.message,
    });
  }
};


const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};


const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isRead } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (title !== undefined) {
      book.title = title;
    }

    if (author !== undefined) {
      book.author = author;
    }

    if (isRead !== undefined) {
      book.isRead = isRead;
    }

    const updatedBook = await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update book",
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

export {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
};