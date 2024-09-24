const express = require("express");
const authenticateJWT = require("../middleware/auth.middleware");
const router = express.Router();
const prisma = require("../db/index");
const {
  getAllUsers,
  addDataUser,
  getUserById,
  updateUserById,
  deleteUser,
} = require("./user.service");

// Read All users
router.get("/users", authenticateJWT, async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
});

// Read user By Id
router.get("/user/:id", authenticateJWT, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getUserById(id);
    if (!user) {
      return res.send("Data User Tidak Di Temukan");
    }

    res.send(user);
  } catch (error) {
    res.send({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Create user
router.post("/user", authenticateJWT, async (req, res) => {
  try {
    const newUser = req.body;
    if (!(newUser.name && newUser.email && newUser.password)) {
      return res.status(400).send("Lengkapi Data User");
    }
    await addDataUser(newUser);

    res.send({
      data: newUser,
      message: "Data User Berhasil Ditambahkan",
    });
  } catch (error) {
    res.status(500).send({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Update user By Id
router.patch("/user/update/:id", authenticateJWT, async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    const dataUser = req.body;

    const user = await updateUserById(user_id, dataUser);

    res.send({
      data: user,
      message: "Data User Berhasil Diupdate",
    });
  } catch (error) {
    res.send({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Delete user By Id
router.delete("/user/delete/:id", authenticateJWT, async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    await deleteUser(user_id);
    res.send("Data User Berhasil Di Hapus");
  } catch (error) {
    res.send({
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
