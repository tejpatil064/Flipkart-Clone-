import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productid: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    feature: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        default: 0,
      },
      final_price: {
        type: Number,
        required: true,
      },
    },
    availability: {
      type: Boolean,
      default: true,
    },
    shipping_details: {
      shipping_time: {
        type: String,
        required: true,
      },
      shipping_cost: {
        type: String,
        required: true,
      },
      return_policy: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true } // Auto creates createdAt and updatedAt fields
);

const Product = mongoose.model("Product", productSchema);

export default Product;
