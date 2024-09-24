import React, { useEffect, useState } from "react";
import "./BookTable.css";
import UpdateBook from "./UpdateBook";

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3001/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3001/book/delete/${bookId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book.id_book !== bookId)
          );
          alert("Book deleted successfully");
        } else {
          alert("Failed to delete book");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("An error occurred while deleting the book");
      }
    }
  };

  const handleUpdate = (bookId) => {
    setSelectedBookId(bookId);
    setShowUpdateForm(true);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
    setSelectedBookId(null);
    // Re-fetch books after update
    fetchBooks();
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3001/books");
      const updatedBooks = await response.json();
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error fetching books after update:", error);
    }
  };

  const renderBooks = () => {
    return books.map((book, index) => (
      <tr className="book-row" key={book.id_book}>
        <td className="book-cell">{index + 1}</td>
        <td className="book-cell">{book.book_name}</td>
        <td className="book-cell">{book.author}</td>
        <td className="book-cell">{book.description}</td>
        <td className="book-cell">{book.title}</td>
        <td className="book-cell">Rp.{book.price}</td>
        <td className="book-cell">{book.publishedYear}</td>
        <td className="book-cell">{book.createdAt}</td>
        <td className="book-cell action-cell">
          <button
            className="update-button"
            onClick={() => handleUpdate(book.id_book)}
          >
            Update
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(book.id_book)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {showUpdateForm ? (
            <UpdateBook
              bookId={selectedBookId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          ) : (
            <table className="book-table">
              <thead>
                <tr className="header-row">
                  <td className="header-cell">No</td>
                  <td className="header-cell">Book Name</td>
                  <td className="header-cell">Author</td>
                  <td className="header-cell">Description</td>
                  <td className="header-cell">Title</td>
                  <td className="header-cell">Price</td>
                  <td className="header-cell">Published Year</td>
                  <td className="header-cell">Created At</td>
                  <td className="header-cell">Action</td>
                </tr>
              </thead>
              <tbody>{renderBooks()}</tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default BookTable;
