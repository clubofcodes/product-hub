const express = require("express");
const {
  addCategory,
  getCategories,
} = require("../controllers/categoryController");
const upload = require("../middleware/multerConfig");
const router = express.Router();

router.post("/add", upload.single("bannerImage"), addCategory);
router.get("/list", getCategories);

// You can add more routes for edit, delete, etc.

module.exports = router;
