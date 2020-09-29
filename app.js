const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const TaskModel = require("./models/task");
const multer = require("multer");
const task = require("./models/task");
var upload = multer();

mongoose
  .connect(
    "mongodb+srv://listo_admin:listo_admin190769@cluster0.tgccr.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion Mongo réussie"))
  .catch(() => console.log("Connexion mongo échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(upload.array());
app.use(express.static("public"));

app.use(bodyParser.json());

app.post("/api/tasks", (req, res, next) => {
  delete req.body._id;
  const task = new TaskModel({
    ...req.body,
  });
  console.log(task);
  task
    .save()
    .then(() => res.status(201).json({ message: "Task registered !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/tasks/:id", (req, res, next) => {
  console.log("GET : " + req.params.id);
  TaskModel.findOne({ _id: req.params.id })
    .then((task) => res.status(200).json(task))
    .catch((error) => res.status(404).json({ error }));
});

app.use("/api/tasks", (req, res, next) => {
  TaskModel.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});
module.exports = app;
