const express = require("express");
const Todo = require("./models/todo");
const router = express.Router();

router.post("/posts", async (req, res) => {
  console.log(req.body);
  const todo = new Todo({
    item: req.body.item,
    checked: req.body.checked,
  });
  await todo.save();
  res.send(todo);
});

router.get("/get", function (req, res, next) {
  Todo.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Failed to retrive list " + err);
    }
  });
});

router.get("/get/unchecked", function (req, res, next) {
  Todo.find({ checked: false }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Failed to retrive list " + err);
    }
  });
});

router.get("/get/checked", function (req, res, next) {
  Todo.find({ checked: true }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Failed to retrive list " + err);
    }
  });
});

router.put("/put/:id", (req, res, next) => {
  Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, todo) => {
      if (err) return res.status(500).send(err);
      return res.send(todo);
    }
  );
});

router.delete("/delete/:id", function (req, res) {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Todo successfully deleted",
      id: todo._id,
    };
    return res.status(200).send(response);
  });
});

module.exports = router;
