const express = require("express");
const {
  addAttribute,
  getAttributes,
} = require("../controllers/attributeController");
const router = express.Router();

router.post("/add", addAttribute);
router.get("/list", getAttributes);

// You can add more routes for edit, delete, etc.

module.exports = router;
