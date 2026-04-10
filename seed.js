import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import mongoose from "mongoose";
import Product from "./src/models/product.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, ".env") });

const products = [
  { name: "Stock Fish", price: 8000, category: "seafood", image: "images/dried stockfish.jpeg" },
  { name: "Garri (Ijebu)", price: 3000, category: "grains", image: "images/ijabu garri.jpg" },
  { name: "Dried Ugu Leaf", price: 3000, category: "vegetables", image: "images/dry Ugu.jpg" },
  { name: "Dried Bitter Leaf", price: 2800, category: "vegetables", image: "images/dried bitter leaf.jpg" },
  { name: "Dried Uziza Leaf", price: 3200, category: "vegetables", image: "images/Dried Uziza Leaf.jpg" },
  { name: "Rice", price: 45000, category: "grains", image: "images/Rice.jpg" },
  { name: "Brown Beans", price: 12000, category: "grains", image: "images/Brown Beans.jpg" },
  { name: "Yam Flour (Elubo)", price: 5000, category: "tubers", image: "images/Yam Flour.jpg" },
  { name: "Plantain Flour", price: 4500, category: "tubers", image: "images/Plantain Flour.jpeg" },
  { name: "Dried Yam Chips", price: 3500, category: "tubers", image: "images/Dried Yam Chips.jpg" },
  { name: "Egusi Seeds", price: 4000, category: "spices", image: "images/Egusi Seeds.png" },
  { name: "Ogbono Seeds", price: 4200, category: "spices", image: "images/Ogbono Seeds.jpg" },
  { name: "Palm Oil (5L)", price: 7000, category: "spices", image: "images/palm-oil.jpg" },
  { name: "Dried Pepper (Tatashe)", price: 2500, category: "spices", image: "images/Dried pepper.webp" },
  { name: "Crayfish (Ground)", price: 4500, category: "seafood", image: "images/crayfish.jpg" },
  { name: "Dried Cat Fish", price: 6000, category: "seafood", image: "images/dried catfish.jpg" },
  { name: "Garri", price: 8000, category: "grains", image: "images/Garri.jpg" },
  { name: "Dried Banga Pulp", price: 3500, category: "spices", image: "images/Dried Banga Pulp2.jpg" }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();
