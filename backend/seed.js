import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import mongoose from "mongoose";
import Product from "./src/models/product.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, ".env") });

const products = [
  { name: "Garri (Ijebu)", price: 3000, category: "grains", image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400" },
  { name: "Rice", price: 45000, category: "grains", image: "images/Rice.jpg" },
  { name: "Brown Beans", price: 12000, category: "grains", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400" },
  { name: "Garri", price: 8000, category: "grains", image: "images/Garri.jpg" },
  { name: "Yam Flour (Elubo)", price: 5000, category: "tubers", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400" },
  { name: "Plantain Flour", price: 4500, category: "tubers", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400" },
  { name: "Dried Yam Chips", price: 3500, category: "tubers", image: "images/Dried Yam Chips.jpg" },
  { name: "Dried Pepper (Tatashe)", price: 2500, category: "spices", image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400" },
  { name: "Egusi Seeds", price: 4000, category: "spices", image: "https://images.unsplash.com/photo-1612257999756-c0f9e91f7e5e?w=400" },
  { name: "Ogbono Seeds", price: 4200, category: "spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400" },
  { name: "Palm Oil (5L)", price: 7000, category: "spices", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400" },
  { name: "Dried Banga Pulp", price: 3500, category: "spices", image: "images/Dried Banga Pulp2.jpg" },
  { name: "Crayfish (Ground)", price: 4500, category: "seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400" },
  { name: "Stock Fish", price: 8000, category: "seafood", image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=400" },
  { name: "Dried Cat Fish", price: 6000, category: "seafood", image: "images/dried catfish.jpg" },
  { name: "Dried Ugu Leaf", price: 3000, category: "vegetables", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400" },
  { name: "Dried Bitter Leaf", price: 2800, category: "vegetables", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" },
  { name: "Dried Uziza Leaf", price: 3200, category: "vegetables", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products with images`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();