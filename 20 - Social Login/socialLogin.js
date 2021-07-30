const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function checkGoogleAuthenticated(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

app.get("/", (req, res) => {
  const token = req.cookies.session_token;
  checkGoogleAuthenticated(token)
    .then((payload) => {
      const user = { name: payload.name, avatar: payload.picture };
      res.render("profile", { user });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/login.html"));
});

app.post("/login", (req, res) => {
  const token = req.body.token;
  checkGoogleAuthenticated(token)
    .then((payload) => {
      res.cookie("session_token", token);
      res.send("success");
    })
    .catch(console.error);
});

app.get("/logout", (req, res) => {
  res.clearCookie("sesion-token");
  res.redirect("/login");
});

app.listen(5000, () => {
  console.log("Server is running in port 5000");
});
