const express = require("express");
const app = express();
const client = require("./connectPostgreSQL");

app.use(express.json());
client.connect();

app.post("/create", async (req, res) => {
  const name = req.body.name;
  const age = req.body.phone;
  const subjects = req.body.subject;
  const type = req.body.type;
  const tien = req.body.tien;
  const query = `INSERT INTO student(name, age, subjects, type, status) VALUES(${name}, ${age}, ${subjects}, ${type}, ${tien}, ${0})`;

  client
    .query(query)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(400));
});

app.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const age = req.body.phone;
  const subjects = req.body.subject;
  const type = req.body.type;
  const tien = req.body.tien;
  const query = `UPDATE student SET name=${name}, age=${age}, type=${type}, subjects=${subjects}, tien=${tien} WHERE student.id = ${id}"`;
  const params = [];
  client
    .query(query)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(400));
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  const query = `DELETE FROM student WHERE student.id=${id}`;
  client
    .query(query)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(400));
});

app.get("/findById/:id", async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM student WHERE student.id=${id}`;
  client
    .query(query)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(400));
});

// /findAll?type=type&page=page&limit=limit
app.get("/findAll/", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const type = req.query.type;
  const type = req.query.type;
  const page = req.query.page;
  const size = req.query.size;
  const query = `SELECT * FROM student WHERE student.type = ${type} LIMIT ${page} OFFSET ${limit}`;
  client
    .query(query)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(400));
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
