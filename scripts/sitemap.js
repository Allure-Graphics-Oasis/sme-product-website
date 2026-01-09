import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ 1. Connect to MongoDB (Atlas / Render backend DB)
dotenv.config();
const MONGO_URI = process.env.MONGO_URI; // replace with your URI
await mongoose.connect(MONGO_URI);

// ✅ 2. Define your Product model (adjust to match your backend schema)
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // GridFS file ID or URL (primary image)
      required: true,
    },
    images: {
      type: [String], // Array of GridFS file IDs or URLs (additional images)
      default: [],
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Coffee Machines",
        "Spare Parts",
        "Accessories",
        "Refrigeration",
        "Food Processing",
        "Baking & Cooking",
        "General Equipment",
        "Coffee & Beverage",
        "Baking & Cooking",
      ],
    },
    condition: {
      type: String,
      required: true,
      enum: ["Excellent", "Good", "Fair", "New"],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Product = mongoose.model("Product", productSchema, "products");

// ✅ 3. Create sitemap
const sitemap = new SitemapStream({
  hostname: "https://www.dawacoffeemachienesandaccessories.com",
});

// Add static pages
sitemap.write({ url: "/", changefreq: "daily", priority: 1.0 });
sitemap.write({ url: "/about", changefreq: "monthly", priority: 0.5 });

// Fetch products and add them
const products = await Product.find({});
products.forEach((product) => {
  sitemap.write({
    url: `/product/${product.slug}`,
    changefreq: "weekly",
    lastmod: product.updatedAt || new Date(),
    priority: 0.8,
  });
});

// End sitemap
sitemap.end();

//5. Save to frontend/public
const sm = await streamToPromise(sitemap);
createWriteStream("../public/sitemap.xml").write(sm.toString());

console.log("Sitemap generated successfully!");

// Close DB connection
await mongoose.disconnect();
