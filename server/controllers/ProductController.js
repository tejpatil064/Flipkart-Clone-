import Product from "../model/Product.js";

// Create a new product
export async function createProduct(req, res) {
  try {
    const { productData } = req.body;
    // console.log(req.body);
    // Check if the product already exists
    const existingProduct = await Product.findOne({
      productid: productData.productid,
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with this product ID already exists",
      });
    }

    // Create a new product
    const product = await Product.create({
      ...productData,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get all products
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get a product by ID
export async function getProductById(req, res) {
  try {
    const { productid } = req.params;

    const product = await Product.findOne({ productid });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Update a product by ID
export async function updateProduct(req, res) {
  try {
    const { productid } = req.params;
    const {
      title,
      description,
      feature,
      category,
      subcategory,
      images,
      price,
      availability,
      shipping_details,
    } = req.body;

    // Find the product by productid and update
    const product = await Product.findOneAndUpdate(
      { productid },
      {
        title,
        description,
        feature,
        category,
        subcategory,
        images,
        price,
        availability,
        shipping_details,
      },
      { new: true } // Returns the updated document
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Delete a product by ID
export async function deleteProduct(req, res) {
  try {
    const { productid } = req.params;

    const product = await Product.findOneAndDelete({ productid });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
