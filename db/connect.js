const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/product-hub-db";

mongoose
  .connect(DB)
  .then((conn) => console.log({ "Database Connected": conn.connection.host }))
  .catch((err) => {
    console.log({ "Database Error: ": err.message });
    process.exit(1);
  });
