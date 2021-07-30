const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());

const users = [
  {
    email: "ahihi@ahihi.com",
    password: "$2b$10$/FRLpvST5VwIP4XEJlthvOUoh/FjCmpZAn3FGkob6BvGYN4sLfMZ.",
  },
  {
    email: "ihaha@ihaha.com",
    password: "$2b$10$lRu1c6FAGILMHVFOsIKhBu3GhiWDsGC0mS7Sih69uBc2X4bcnZUYi",
  },
];

const posts = [
  {
    title: "Happy",
    content: "Clap along if you feel like happiness is the truth",
    email: "ahihi@ahihi.com",
  },
  {
    title: "Bad day",
    content: "You sing a sad song just to turn it around",
    email: "ihaha@ihaha.com",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users/register", async (req, res) => {
  try {
    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const email = req.body.email;

    const check = users.find((user) => user.email === email);
    if (check) return res.send({ message: "Email is existed" });
    console.log(req.body.password.length);
    if (req.body.password.length <= 3 || req.body.password.length >= 10)
      return res.send({
        message: "Password length must be between 5 and 10 characters",
      });
    if (emailRegexp.test(email)) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = { email, password };
      users.push(user);
      res.sendStatus(201);
    } else {
      res.send({ message: "E-mail is incorrect syntax" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);
  if (!user)
    return res.status(404).send({ message: "E-mail or password is incorrect" });
  try {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      //   console.log(req.header.authorization);
      res.json({ accessToken: accessToken });
    } else {
      res.send("Not allowed");
    }
  } catch {
    res.sendStatus(500);
  }
});

app.get("/posts", authenticateToken, (req, res) => {
  //   console.log(req.body);
  res.json(
    posts.filter((post) => {
      return post.email === req.user.email;
    })
  );
});

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    req.user = user;
    next();
  });
}

app.listen(3000);
