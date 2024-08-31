const router = require("express").Router();
const { addProduct, getProducts } = require("../controllers/productController");

router.post("/add", upload.single("thumb"), addProduct);
router.get("/list", getProducts);

// You can add more routes for edit, delete, etc.

module.exports = router;
