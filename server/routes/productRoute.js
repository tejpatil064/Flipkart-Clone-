import express from "express";
import cors from "cors";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";

const router = express.Router();
router.use(cors());

// Create a new product
router.post("/addproduct", createProduct);

// Get all products
router.get("/getAllProducts", getAllProducts);

// Get a product by ID
router.get("/getproductbyid/:productid", getProductById); 

// Update a product by ID
router.put("/updateproduct/:productid", updateProduct); 

// Delete a product by ID
router.delete("/deleteproduct/:productid", deleteProduct); 

export default router;
