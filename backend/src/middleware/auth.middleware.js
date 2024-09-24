const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header Authorization

  if (!token) {
    return res.status(403).send("Akses ditolak. Token tidak ditemukan.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data user yang telah di-decode ke dalam request object
    next(); // Lanjut ke middleware berikutnya
  } catch (error) {
    res.status(401).send("Token tidak valid");
  }
};

module.exports = authenticateJWT;
