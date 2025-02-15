import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
function dbConnect() {
  const db = mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(() => {
      console.log("Error connecting to MongoDB");
      console.error();
      process.exit(1);
    });
}

export default dbConnect;
