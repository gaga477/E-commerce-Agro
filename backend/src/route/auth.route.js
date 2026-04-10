import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const ADMIN = {
  email: "admin@helenagro.com",
  password: "123456"
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN.email && password === ADMIN.password) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "SECRET_KEY", { expiresIn: "1d" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

export default router;