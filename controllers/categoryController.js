const Category = require("../models/categorySchema");

exports.addCategory = async (req, res) => {
  const { name, status, slug, parent } = req.body;

  // basic validation
  if (!name || !status) {
    return res.status(400).json({ error: "Name and status are required" });
  }

  // Generate the slug from the name if not provided
  const slugStr =
    slug ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  try {
    // Check if the slug already exists in the database
    const existingCategory = await Category.findOne({ slug: slugStr });
    if (existingCategory) {
      return res.status(400).json({
        message:
          "Category must be unique. Slug with this category already exists.",
      });
    }

    const newCategory = new Category({
      name,
      status,
      parent: parent || null,
      bannerImage: req.file ? req.file.path : null,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent");
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
