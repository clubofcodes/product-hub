const Attribute = require("../models/attributeSchema");

exports.addAttribute = async (req, res) => {
  const { name, status, slug } = req.body;

  // Basic validation
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
    const existingAttribute = await Attribute.findOne({ slug: slugStr });
    if (existingAttribute) {
      return res.status(400).json({
        message:
          "Attribute must be unique. Slug with this attribute already exists.",
      });
    }

    const newAttribute = new Attribute(req.body);

    await newAttribute.save();
    res.status(201).json(newAttribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find();
    res.status(200).json(attributes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAttribute = await Attribute.findByIdAndDelete(id);

    if (!deletedAttribute) {
      return res.status(404).json({ message: "Attribute not found." });
    }

    res.status(200).json({ message: "Attribute deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
