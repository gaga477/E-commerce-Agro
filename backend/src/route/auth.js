const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ADMIN = {
  email: "admin@helenagro.com",
  password: "123456"
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN.email && password === ADMIN.password) {
    const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1d" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;