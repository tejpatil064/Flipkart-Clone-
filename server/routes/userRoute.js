import express from "express";
import cors from "cors";
import { Signup, GetUsers, Login } from "./../controllers/UserContorller.js";

const router = express.Router();
router.use(cors());

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/getusers", GetUsers);

export default router;
