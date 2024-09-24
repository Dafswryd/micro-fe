const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { PrismaClient } = require("@prisma/client");
const bookController = require("./book/book.controller");
const userController = require("./user/user.controller");
const authController = require("./auth/auth.controller");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.use("/", bookController);
app.use("/", userController);
app.use("/", authController);

app.listen(PORT, () => {
  console.log("Express API Running in PORT: " + PORT);
});
