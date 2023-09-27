const {
  getAllProducts,
  createNewProduct,
  getProductByProductName,
} = require("../controllers/products");
const router = require("express").Router();

router.get("/", getAllProducts);
router.get("/:name", getProductByProductName);
router.post("/newProduct", createNewProduct);

module.exports = router;
