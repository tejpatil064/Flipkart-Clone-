import express from "express";
import cors from "cors";
import { Signup, GetUser, Login } from "../../../signup/server/controllers/UserContorller.js";

const router = express.Router();
router.use(cors());

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/getusers", GetUser);

export default router;
