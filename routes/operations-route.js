const express = require("express");
const router = express.Router();
const Operations = require("../models/operations-schema");
const ObjectID = require("mongodb").ObjectId;
router.get("/", async (req, res) => {
  try {
    const operation = await Operations.find();
    res.json(operation);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error");
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await Operations.findById(id, (operation) => {
      res.json(operation);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/add", async (req, res) => {
  let operation = new Operations(req.body);
  try {
    await operation.save();
    res.status(200).json({ operation: "operation added successfully" });
  } catch (err) {
    res.status(400).send("adding new operation failed");
    console.log(err);
  }
});
router.put("/update/:id", (req, res) => {
  Operations.findById(req.params.id, async (err, operation) => {
    try {
      if (!operation) res.status(404).send("data is not found");
      else operation.description = req.body.description;
      operation.category = req.body.category;
      operation.type = req.body.type;
      operation.summary = req.body.summary;
      operation.date = req.body.date;

      await operation.save();
      res.json("Operation updated!");
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
    await Operations.collection.deleteOne({ _id: ObjectID(`${id}`) });
    res.status(200).json("Operation deleted!");
  } catch (err) {
    res.status(400).json("Unexpected error!");
    console.log(err);
  }
});

module.exports = router;
