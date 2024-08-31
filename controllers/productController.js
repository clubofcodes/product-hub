const Product = require("../models/productSchema");

exports.addProduct = async (req, res) => {
  const { name, description, taxClass, categories, variations, slug } =
    req.body;

  // basic validation
  if (!name || !taxClass || !categories || !variations) {
    return res.status(400).json({
      error: "Name, tax class, categories, and variations are required",
    });
  }

  // Generate the slug from the name if not provided
  const slugStr = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  try {
    // Check if the slug already exists in the database
    const existingProduct = await Product.findOne({ slug: slugStr });
    if (existingProduct) {
      return res.status(400).json({
        message:
          "Product must be unique. Slug with this product already exists.",
      });
    }

    const newProduct = new Product({
      ...req.body,
      description: description || "",
      thumb: req.file ? req.file.path : null,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "categories variations.attribute"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// You can add more controller functions for edit, delete, etc.
