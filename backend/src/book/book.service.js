const prisma = require("../db/index");
const {
  findBooks,
  insertBook,
  findBookById,
  updateBook,
  deleteBookById,
} = require("./book.repository");

const getAllBooks = async () => {
  const dataBooks = await findBooks();

  return dataBooks;
};

const getBookById = async (book_id) => {
  const dataBook = await findBookById(book_id);
  return dataBook;
};

const addDataBook = async (newBook) => {
  const book = await insertBook(newBook);

  return book;
};

const updateBookById = async (book_id, dataBook) => {
  const bookId = await getBookById(book_id);
  if (!bookId) {
    throw new Error("Data Buku Tidak Di Temukan");
  }
  const book = await updateBook(book_id, dataBook);
  return book;
};

const deleteBook = async (book_id) => {
  const book = await getBookById(book_id);
  if (!book) {
    throw new Error("Data Buku Tidak Ditemukan");
  }

  await deleteBookById(book_id);
};

module.exports = {
  getAllBooks,
  addDataBook,
  getBookById,
  deleteBook,
  updateBookById,
};
