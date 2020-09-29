const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
