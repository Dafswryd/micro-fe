import { useState, useEffect } from "react";
import "./FormInput.css";

const EditFormInput = ({ bookId, onSubmitSuccess }) => {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    id_book: "",
    book_name: "",
    author: "",
    description: "",
    title: "",
    price: "",
    publishedYear: "",
  });

  // Fetch data buku berdasarkan ID ketika komponen pertama kali di-mount
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/book/${bookId}`);
        if (response.ok) {
          const bookData = await response.json();
          setFormData(bookData); // Mengisi state dengan data buku yang sudah ada
        } else {
          console.error("Failed to fetch book data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [bookId]);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk mengirim data yang diperbarui ke server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/book/update/${bookId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Book updated successfully:", result);
        onSubmitSuccess(); // Panggil callback setelah update berhasil
      } else {
        console.error("Error updating book:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {/* Form field yang sama seperti create */}
      <div className="input-group">
        <label htmlFor="id_book">Book ID :</label>
        <input
          type="number"
          id="id_book"
          name="id_book"
          value={formData.id_book}
          onChange={handleInputChange}
          disabled // ID buku tidak diubah saat edit
        />
      </div>

      <div className="input-group">
        <label htmlFor="book_name">Book Name :</label>
        <input
          type="text"
          id="book_name"
          name="book_name"
          value={formData.book_name}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="author">Author :</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="description">Description :</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="title">Title :</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="price">Price :</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="publishedYear">Published Year :</label>
        <input
          type="text"
          id="publishedYear"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="submit-button">
        Update Book
      </button>
    </form>
  );
};

export default EditFormInput;
