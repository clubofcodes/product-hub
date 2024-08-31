const express = require("express");
const {
  addAttribute,
  getAttributes,
  deleteAttribute,
} = require("../controllers/attributeController");
const router = express.Router();

router.post("/add", addAttribute);
router.get("/list", getAttributes);
router.delete("/delete/:id", deleteAttribute);

module.exports = router;
