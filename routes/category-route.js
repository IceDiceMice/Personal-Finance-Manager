const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectId;
const Category = require("../models/categories-schema");

router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error");
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await Category.findById(id, (err, category) => {
      res.json(category);
    });
  } catch (err) {
    console.log(err);
    res.status(404).send("Not found");
  }
});

router.post("/add", async (req, res) => {
  try {
    let category = new Category(req.body);
    await category.save();
    res.status(200).json({ category: "category added successfully" });
  } catch (err) {
    res.status(400).send("adding new category failed");
    console.log(err);
  }
});

router.put("/update/:id", (req, res) => {
  Category.findById(req.params.id, async (err, category) => {
    try {
      if (!category) res.status(404).send("data is not found");

      category.description = req.body.description;
      category.name = req.body.name;
      await category.save();
      res.json("Category updated!");
    } catch {
      (err) => {
        res.status(400).send("Update not possible");
        console.log(err);
      };
    }
  });
});

router.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await Category.collection.deleteOne({ _id: ObjectID(`${id}`) });
    res.status(200).json("Category deleted!");
  } catch (err) {
    res.status(400).json("Unexpected error!");
    console.log(err);
  }
});

module.exports = router;
