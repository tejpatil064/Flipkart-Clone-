import mongoose from "mongoose";


const SellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role:{
      type: String,
      default: "seller",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Seller = mongoose.model("Seller", SellerSchema);
export default Seller;
