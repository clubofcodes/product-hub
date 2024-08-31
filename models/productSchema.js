const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
    unique: true,
    default: function () {
      return this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    },
  },
  description: { type: String },
  thumb: { type: String, required: true },
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  ],
  taxClass: { type: Number, required: true },
  variations: [
    {
      attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
        required: true,
      },
      sku: { type: String, required: true },
      images: [String],
      salePrice: { type: Number, required: true },
      regularPrice: { type: Number, required: true },
      stock: { type: Number, required: true },
    },
  ],
  entryDate: { type: Date, default: Date.now },
  modDate: { type: Date, default: Date.now },
});

productSchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
  this.modDate = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
