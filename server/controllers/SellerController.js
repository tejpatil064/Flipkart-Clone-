import Seller from "../models/seller.model.js";
import { generateOtp, sendOtp } from "../utils/otpUtils.js"; // You may implement OTP generation and sending separately

// Create a new seller
export async function createSeller(req, res) {
  try {
    const { name, shopName, phoneNumber, email } = req.body;

    // Check if seller already exists
    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Seller with this email already exists",
      });
    }

    // Create a new seller
    const seller = await Seller.create({
      name,
      shopName,
      phoneNumber,
      email,
    });

    return res.status(201).json({
      success: true,
      message: "Seller created successfully",
      seller,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Seller Login (Simulate login with OTP)
export async function sellerLogin(req, res) {
  try {
    const { email } = req.body;

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Generate OTP for login
    const otp = generateOtp();

    // Send OTP (using an email service or some other method)
    await sendOtp(seller.email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
      otp, // For testing purposes; In real applications, do not send OTP in the response.
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Verify Seller OTP for login
export async function verifySellerOtp(req, res) {
  try {
    const { email, otp, generatedOtp } = req.body; // OTP should be generated and stored securely (e.g., in a session)

    if (otp !== generatedOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    // Successful login, you could generate a JWT token here if needed
    return res.status(200).json({
      success: true,
      message: "Seller logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get all sellers
export async function getAllSellers(req, res) {
  try {
    const sellers = await Seller.find();
    return res.status(200).json({
      success: true,
      message: "Sellers fetched successfully",
      sellers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get a single seller by ID
export async function getSellerById(req, res) {
  try {
    const { id } = req.params;

    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seller fetched successfully",
      seller,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Update seller details
export async function updateSeller(req, res) {
  try {
    const { id } = req.params;
    const { name, shopName, phoneNumber, email } = req.body;

    // Find the seller by ID and update
    const seller = await Seller.findByIdAndUpdate(
      id,
      { name, shopName, phoneNumber, email },
      { new: true } // Returns the updated document
    );

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seller updated successfully",
      seller,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Delete a seller
export async function deleteSeller(req, res) {
  try {
    const { id } = req.params;

    const seller = await Seller.findByIdAndDelete(id);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seller deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
