import Seller from "../model/Seller.js";

// Create a new seller (with password)
export async function createSeller(req, res) {
  try {
    console.log(req.body);
    const { name, shopName, phoneNumber, email, password } = req.body;

    // Check if seller already exists
    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Seller with this email already exists",
      });
    }

    // Create a new seller with password (no hashing)
    const seller = await Seller.create({
      name,
      shopName,
      role: "seller",
      phoneNumber,
      email,
      password, // Plaintext password (no hashing)
    });

    return res.status(201).json({
      success: true,
      message: "Seller created successfully",
      seller,
      route: "/seller/sellerlogin",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Seller Login (using email and password)
export async function sellerLogin(req, res) {
  try {
    const { email, password } = req.body; // Receive email and password

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Compare the entered password with the stored plain password
    if (seller.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Successful login (you can generate a JWT token here if needed)
    console.log(seller);
    console.log("Seller logged in successfully");
    return res.status(200).json({
      success: true,
      message: "Seller logged in successfully",
      seller: seller,
      route: "/seller/dashboard", // You can change the route if needed
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Verify Seller OTP for login (Remove this, if not using OTP)
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
    const { name, shopName, phoneNumber, email, password } = req.body;

    // Find the seller by ID and update
    const seller = await Seller.findByIdAndUpdate(
      id,
      { name, shopName, phoneNumber, email, password },
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
