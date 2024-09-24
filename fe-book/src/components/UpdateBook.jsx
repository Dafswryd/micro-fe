import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateBook.css";

const UpdateBook = ({ bookId, onUpdateSuccess }) => {
  const [book, setBook] = useState({
    book_name: "",
    author: "",
    description: "",
    title: "",
    price: 0,
    publishedYear: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3001/book/${bookId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]:
        name === "price"
          ? parseFloat(value)
          : name === "publishedYear"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/book/update/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        }
      );
      if (response.ok) {
        alert("Book updated successfully");
        onUpdateSuccess(); // Call the function to update the list in BookTable
      } else {
        alert("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("An error occurred while updating the book");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Book</h2>
      <input
        type="text"
        name="book_name"
        value={book.book_name}
        onChange={handleChange}
        placeholder="Book Name"
        required
      />
      <input
        type="text"
        name="author"
        value={book.author}
        onChange={handleChange}
        placeholder="Author"
        required
      />
      <textarea
        name="description"
        value={book.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="title"
        value={book.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        type="number"
        name="price"
        value={book.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="publishedYear"
        value={book.publishedYear}
        onChange={handleChange}
        placeholder="Published Year"
        required
      />
      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBook;
