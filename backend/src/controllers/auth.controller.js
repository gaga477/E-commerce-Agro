import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    email,
    password: hashed
  });

  res.json(admin);
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) return res.status(400).json({ msg: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token });
};