const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else
  app.get("/", (req, res) => {
    res.send("API is running");
  });

const PORT = process.env.PORT || 4000;

const categoryRouter = require("./routes/category-route");
const operationsRouter = require("./routes/operations-route");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/category", categoryRouter);
app.use("/api/operations", operationsRouter);

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}.`);
});
