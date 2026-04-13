import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import productRoutes from "./route/product.route.js";
import orderRoutes from "./route/order.route.js";
import authRoutes from "./route/auth.route.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../public/index.html"));
});

app.get("/privacy-policy", (req, res) => {
  res.sendFile(join(__dirname, "../public/pages/privacy-policy.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;
