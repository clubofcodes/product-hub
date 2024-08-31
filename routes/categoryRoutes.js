const express = require("express");
const {
  addCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const upload = require("../middleware/multerConfig");
const router = express.Router();

router.post("/add", upload.single("bannerImage"), addCategory);
router.get("/list", getCategories);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
