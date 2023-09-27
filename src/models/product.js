const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category model (if you have one)
  },
});

const ProductModel = mongoose.model("Product", productSchema);

const createProduct = (values) =>
  new ProductModel(values).save().then((product) => product.toObject());
const deleteProductById = (id) => ProductModel.findByIdAndDelete({ _id: id });
const getProductById = (id) => ProductModel.findById(id);
const getProducts = () => ProductModel.find();
const getProductsByCategoryId = (categoryId) =>
  ProductModel.find({ category: categoryId });
const updateProductById = (id, values) =>
  ProductModel.findByIdAndUpdate(id, values);

module.exports = {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  getProductsByCategoryId,
  updateProductById,
};
