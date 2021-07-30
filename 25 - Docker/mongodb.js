const express = require("express");
const app = express();
const db = require("./connectMongodb");
const Student = require("./model/student");

app.use(express.json());

db.connectDb();

app.post("/create", async (req, res) => {
  try {
    const name = req.body.name;
    const age = req.body.age;
    const subjects = req.body.subjects;
    const type = req.body.type;
    const tien = req.body.tien;

    const student = new Student({
      name,
      age,
      subjects,
      type,
      tien,
      status: false,
    });

    await student.save();

    res.statusSend(200);
  } catch (err) {
    res.statusSend(400);
  }
});

app.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const type = req.body.type;
    const tien = req.body.tien;

    Student.findById(id, async function (err, doc) {
      if (err) {
        res.statusSend(200);
      }
      doc.name = name;
      doc.phone = phone;
      doc.email = email;
      doc.type = type;
      doc.tien = tien;

      await doc.save();
      res.statusSend(200);
    });
  } catch (err) {
    res.statusSend(400);
  }
});

app.post("/delete", async (req, res) => {
  try {
    let id = req.body.id;
    Student.findById(id, async function (err, doc) {
      if (err) {
        res.sendStatus(400);
      } else {
        doc.status = true;
        await doc.save();
        res.statusSend(200);
      }
    });
  } catch (err) {
    console.log(err);
    res.statusSend(400);
  }
});

app.get("/findById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (student.status) {
      res.send("Student is not existed");
    }
    res.send(student);
  } catch (err) {
    res.statusSend(400);
  }
});

app.get("/findAll", async (req, res) => {
  try {
    const type = req.query.type;
    const page = req.query.page;
    const size = req.query.size;

    const filteredStudent = await Student.find({
      type: type,
      status: false,
    });

    filteredStudent = filteredStudent.slice(size * (page - 1), size * page);
    res.send(filteredStudent);
  } catch (err) {
    res.statusSend(200);
  }
});

app.listen(5000, () => {
  console.log("server listen on port 5000");
});
