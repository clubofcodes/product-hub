const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
    unique: true,
    default: function () {
      return this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    },
  },
  bannerImage: { type: String },
  iconImage: { type: String },
  status: { type: String, enum: ["Active", "Inactive"], required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  entryDate: { type: Date, default: Date.now },
  modDate: { type: Date, default: Date.now },
});

// Generate slug manually
categorySchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
  this.modDate = Date.now();
  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
