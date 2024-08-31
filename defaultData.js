const Category = require("./models/categorySchema");
const Attribute = require("./models/attributeSchema");
const Product = require("./models/productSchema");

const DefaultData = async () => {
  try {
    // Clears existing data, which will prevent from repeating of data storing.
    await Category.deleteMany({});
    await Attribute.deleteMany({});
    await Product.deleteMany({});

    // Stores data in mongodb collection.
    const attributes = [
      { name: "Color", status: "Active" },
      { name: "Size", status: "Active" },
    ];
    const savedAttributes = await Attribute.insertMany(attributes);

    const categories = [
      { name: "Electronics", status: "Active" },
      { name: "Books", status: "Active" },
      { name: "Clothing", status: "Active" },
    ];
    const savedCategories = await Category.insertMany(categories);

    const products = [
      {
        name: "Smartphone",
        description: "Latest model smartphone with advanced features.",
        thumb:
          "https://5.imimg.com/data5/SELLER/Default/2022/11/ZA/EW/TS/160115614/apple-iphone-12-black-mobile-phone-500x500.png",
        taxClass: 5,
        categories: [savedCategories[0]._id],
        variations: [
          {
            attribute: savedAttributes[0]._id,
            sku: "SPH-001",
            salePrice: 499.99,
            regularPrice: 599.99,
            stock: 100,
          },
        ],
      },
      {
        name: "T-shirt",
        description: "Comfortable cotton t-shirt available in various sizes.",
        thumb:
          "https://availeverything.com/public/uploads/all/iJ0Z09OPJuaBTOysUMdz8AfwPdirzKvuJn1bFUle.jpg",
        taxClass: 8,
        categories: [savedCategories[2]._id],
        variations: [
          {
            attribute: savedAttributes[1]._id,
            sku: "TSH-001",
            salePrice: 19.99,
            regularPrice: 29.99,
            stock: 200,
          },
        ],
      },
    ];
    const storeData = await Product.insertMany(products);
    // console.log(storeData);
  } catch (error) {
    console.log("Error", error.message);
    console.log({ errorCode: error.code });
    process.exit(1);
  }
};

module.exports = DefaultData;
