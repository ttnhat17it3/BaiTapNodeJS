const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const UnitOfWork = require("./unitOfWork");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const students = await UnitOfWork.studentRepository.getAll();
    res.json(students);
  } catch (error) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const student = await UnitOfWork.studentRepository.getById(id);
    res.json(student);
  } catch (error) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.post("/", async (req, res) => {
  try {
    const newStudent = req.body;
    await UnitOfWork.studentRepository.add(newStudent);
    res.sendStatus(200);
  } catch (error) {
    console.log(err);
    res.sendStatus(400);
  }
});

// Edit all record
app.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newStudent = req.body;
    await UnitOfWork.studentRepository.edit(id, newStudent);
    res.sendStatus(200);
  } catch (error) {
    console.log(err);
    res.sendStatus(400);
  }
});

// Edit parts of record
app.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await UnitOfWork.studentRepository.softedDelete(id);
    res.sendStatus(200);
  } catch (error) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.get("");

app.listen((port) => {
  console.log(`Server is running on port ${port}`);
});
