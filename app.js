const express = require("express");
const app = express();
require("./db/connect"); // local db connection
const routes = require("./routes");
const DefaultData = require("./defaultData");

app.use(express.json());

// Routes
app.use("/api", routes);

const PORT = process.env.PORT || 3575;
app.listen(PORT, () => console.log(`Server is running on port number ${PORT}`));

DefaultData();
