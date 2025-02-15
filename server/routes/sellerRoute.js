import express from "express";
import cors from "cors";
import { Signup, GetUser, Login } from "../../../signup/server/controllers/SellerController.js";

const router = express.Router();
router.use(cors());

router.post("/sellersignup", createSeller);
router.post("/sellerlogin", sellerLogin);
router.get("/getusers", GetUser);
router.get("/getsellerbyid", GetSellerById);
router.get("/getAllSellers", GetAllSellers);

export default router;
