import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation(); // Mendapatkan path current URL

  // Menentukan apakah berada di halaman login atau register
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  if (hideNavbar) return null; // Tidak menampilkan Navbar jika di login atau register

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/users">Users</Link>
        </li>
        <li className="navbar-item">
          <Link to="/books">Books</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
