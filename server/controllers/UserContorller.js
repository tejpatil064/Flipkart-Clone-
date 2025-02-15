import { response } from "express";
import User from "./../model/User.js";

// Signup Controller (without password)
export async function Signup(req, res) {
  try {
    const { name, email, phone, address } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Email already exists" });
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      phone,
      address,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Login Controller (without password, using OTP)
export async function Login(req, res) {
  try {
    const { email, otp } = req.body;

    // In a real-world scenario, you'd verify the OTP with some OTP service
    // For simplicity, assuming a mock OTP comparison
    const mockOtp = "1234"; // This would come from your OTP service

    if (otp !== mockOtp) {
      return res.status(401).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return user data (after OTP validation)
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get all users (optional)
export async function GetUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
