import Express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import produtRoute from "./routes/productRoute.js";
import nodemailer from "nodemailer";
import fs from "fs";
import ejs from "ejs";
import cors from "cors";

dotenv.config();
const app = Express();
const PORT = process.env.PORT;
dbConnect();

// CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
  })
);

// Setting up the mail transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "novacops.rcpit@gmail.com",
    pass: "cvrwlvkrohgbqmse", // Make sure this is securely handled, consider environment variables for sensitive data
  },
});

// Middleware to parse JSON
app.use(Express.json());

// Routes
app.use("/api", userRoute);
app.use("/api", sellerRoute);
app.use("/api", produtRoute);

// OTP request route
app.use("/api/request-otp", async (req, res) => {
  const { email, name } = req.body;

  try {
    // Read the email template
    const template = fs.readFileSync("./helper/mailTemplate.ejs", "utf-8");

    // Generate a 6-digit OTP
    const token = Math.floor(100000 + Math.random() * 900000);

    // Mail options
    const mailOptions = {
      from: "NovaCops | No Reply <novacops.rcpit@gmail.com>",
      to: email,
      subject: "Verify Email",
      html: ejs.render(template, { token, name }),
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
    // Respond with success and OTP
    return res.json({ success: true, otp: token });
  } catch (error) {
    console.error("Failed to send email:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send email" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Flipkart backend server is running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
