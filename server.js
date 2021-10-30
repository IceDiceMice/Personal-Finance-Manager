const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

if (process.env.NODE_ENV === production) {
  app.use(express.static("client/build"));
}

const categoryRouter = require("./routes/category-route");
const operationsRouter = require("./routes/operations-route");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/category", categoryRouter);
app.use("/operations", operationsRouter);

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port: ${process.env.PORT}.`);
});
