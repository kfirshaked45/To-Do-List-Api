const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

const mongoDB = "mongodb://localhost:27017/my_database";

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connnection successful!"));
const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/api", routes);
app.listen(5000, () => {
  console.log("Server has started!");
});
