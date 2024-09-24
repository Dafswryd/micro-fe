const express = require("express");
const { registerUser, loginUser } = require("./auth.service");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send("Lengkapi semua data yang diperlukan");
    }

    // Daftarkan user baru
    const user = await registerUser({ name, email, password });
    if (user && user.password) {
      delete user.password;
    }

    res.status(201).send({ message: "Registrasi berhasil", user });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("Masukkan email dan password");
    }

    // Login user
    const { token, user } = await loginUser(email, password);
    res.send({ message: "Login berhasil", token, user });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Email atau password salah", error: error.message });
  }
});

module.exports = router;
