
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  customer: Object,
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);