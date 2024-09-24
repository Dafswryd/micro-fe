const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("./auth.repository");

const registerUser = async (newUser) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(newUser.password, 10);

  // Simpan user baru ke database
  const user = await createUser({
    ...newUser,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async (email, password) => {
  // Cari user berdasarkan email
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Email atau password salah");
  }

  // Bandingkan password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email atau password salah");
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id_user, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token valid for 1 hour
  );

  return { token, user };
};

module.exports = {
  registerUser,
  loginUser,
};
