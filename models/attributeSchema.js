const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
    unique: true,
    default: function () {
      return this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    },
  },
  status: { type: String, enum: ["Active", "Inactive"], required: true },
  entryDate: { type: Date, default: Date.now },
  modDate: { type: Date, default: Date.now },
});

attributeSchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
  this.modDate = Date.now();
  next();
});

const Attribute = mongoose.model("Attribute", attributeSchema);
module.exports = Attribute;
