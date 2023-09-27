const {
  createProduct,
  getProducts,
  getProductByName,
} = require("../models/product");

const createNewProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    // validate inputs
    const product = {
      name,
      description,
      price,
      category,
    };
    console.log("product", product);

    const newProduct = await createProduct(product);
    console.log("newProduct", newProduct);

    return res
      .status(200)
      .json({
        message: "Product registered with success",
        newProduct: newProduct,
        product: product,
      })
      .end();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (_, res) => {
  try {
    const products = await getProducts();
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductByProductName = async (req, res) => {
  try {
    const { name } = req.params;
    // validate product name
    
    const product = await getProductByName(name);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product: product }).end();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createNewProduct,
  getProductByProductName,
  getAllProducts,
};
