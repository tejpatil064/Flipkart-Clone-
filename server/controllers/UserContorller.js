import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords
import User from "./../model/User.js";

// Signup Controller (with password)
export async function Signup(req, res) {
  try {
    const { name, email, phone, address, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Email already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create a new user with hashed password
    const user = await User.create({
      name,
      email,
      phone,
      role: "user",
      address,
      password: hashedPassword, // Store the hashed password
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: user,
      route: "/user/dashboard",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Login Controller (with password)
export async function Login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log(user);
    // Compare the hashed password with the input password
    console.log(user.password);
    console.log(password);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Return user data (after password validation)
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user,
      route: "/userhomepage",
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

// Get the current logged-in user's profile
export async function GetUserProfile(req, res) {
  try {
    // Assuming you are storing user info in a session or using JWT, you should get the user's id
    const userId = req.user.id; // Replace with actual method to get the logged-in user's ID

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user: { name: user.name }, // Return only necessary data like name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

