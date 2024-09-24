import { useState } from "react";
import BookTable from "./components/BookTable";
import FormInput from "./components/FormInput";

export const Button = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Untuk me-refresh tabel book

  const handleToggle = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleSubmitSuccess = () => {
    setShowForm(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div>
      <button className="shared-btn" onClick={handleToggle}>
        {showForm ? "Show Book Table" : "Add Book"}
      </button>

      {showForm ? (
        <FormInput onSubmitSuccess={handleSubmitSuccess} />
      ) : (
        <BookTable key={refreshKey} />
      )}
    </div>
  );
};

export default Button;
