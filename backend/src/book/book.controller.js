const express = require("express");
const authenticateJWT = require("../middleware/auth.middleware");
const router = express.Router();
const prisma = require("../db/index");
const {
  getAllBooks,
  addDataBook,
  getBookById,
  updateBookById,
  deleteBook,
} = require("./book.service");

// Read All Books
router.get("/books", async (req, res) => {
  const books = await getAllBooks();
  res.send(books);
});

// Read Book By Id
router.get("/book/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = await getBookById(id);
    if (!book) {
      return res.send("Data Buku Tidak Di Temukan");
    }

    res.send(book);
  } catch (error) {
    res.send({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Create Book
router.post("/book", async (req, res) => {
  try {
    const newBook = req.body;
    if (
      !(
        (
          newBook.title &&
          newBook.book_name &&
          newBook.author &&
          newBook.publishedYear &&
          newBook.description &&
          newBook.price
        )
        // newBook.publishedYear
      )
    ) {
      return res.status(400).send("Lengkapi Data Buku");
    }
    await addDataBook(newBook);

    res.send({
      data: newBook,
      message: "Data Buku Berhasil Ditambahkan",
    });
  } catch (error) {
    res.status(500).send({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Update Book By Id
router.patch("/book/update/:id", async (req, res) => {
  try {
    const book_id = parseInt(req.params.id);
    const dataBook = req.body;

    const book = await updateBookById(book_id, dataBook);

    res.send({
      data: book,
      message: "Data Buku Berhasil Diupdate",
    });
  } catch (error) {
    res.send({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Delete Book By Id
router.delete("/book/delete/:id", async (req, res) => {
  try {
    const book_id = parseInt(req.params.id);
    await deleteBook(book_id);
    res.send({
      message: "Data Buku Berhasil Di Hapus",
    });
  } catch (error) {
    res.send({
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
