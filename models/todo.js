const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  item: "string",
  checked: "boolean",
});
const Todo = mongoose.model("Todo", schema);

module.exports = Todo;

module.exports.updateTodo = function (condition, update, callback) {
  Todo.updateOne(condition, update, callback);
};
