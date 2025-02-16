import express from "express";
import cors from "cors";
import {
  createSeller,
  sellerLogin,
  getAllSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
} from "./../controllers/SellerController.js";

const router = express.Router();
router.use(cors());

// Create a new seller (Signup)
router.post("/sellersignup", createSeller);

// Seller Login
router.post("/sellerlogin", sellerLogin);

// Get all sellers
router.get("/getAllSellers", getAllSellers);

// Get a seller by ID
router.get("/getsellerbyid/:id", getSellerById); // Use parameter for ID

// Update seller details (by ID)
router.put("/updateseller/:id", updateSeller); // PUT is commonly used for update

// Delete a seller by ID
router.delete("/deleteseller/:id", deleteSeller); // DELETE method for deleting a seller

export default router;
