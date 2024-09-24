const prisma = require("../db/index");

const findBooks = async () => {
  const books = await prisma.book.findMany();
  return books;
};

const findBookById = async (bookId) => {
  const book = await prisma.book.findUnique({
    where: {
      id_book: bookId,
    },
  });

  return book;
};

const insertBook = async (newBook) => {
  const book = await prisma.book.create({
    data: {
      title: newBook.title,
      book_name: newBook.book_name,
      author: newBook.author,
      publishedYear: parseInt(newBook.publishedYear),
      description: newBook.description,
      price: parseFloat(newBook.price),
      // publishedYear: newBook.publishedYear,
    },
  });
};

const updateBook = async (bookId, dataBook) => {
  const book = await prisma.book.update({
    where: {
      id_book: bookId,
    },
    data: {
      title: dataBook.title,
      book_name: dataBook.book_name,
      author: dataBook.author,
      description: dataBook.description,
      price: dataBook.price,
      publishedYear: dataBook.publishedYear,
    },
  });
  return book;
};

const deleteBookById = async (bookId) => {
  await prisma.book.delete({
    where: {
      id_book: bookId,
    },
  });
};

module.exports = {
  findBooks,
  insertBook,
  findBookById,
  updateBook,
  deleteBookById,
};
