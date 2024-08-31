const router = require("express").Router();
const {
  addProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");
const upload = require("../middleware/multerConfig");

router.post("/add", upload.single("thumb"), addProduct);
router.get("/list", getProducts);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
