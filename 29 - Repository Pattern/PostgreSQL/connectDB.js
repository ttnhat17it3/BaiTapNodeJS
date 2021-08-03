const { Client } = require("pg");
const connectionString = "postgressql://postgres:admin@localhost:5432/training";

const client = new Client({ connectionString });
client
  .connect()
  .then(() => console.log("Connect to database successfully"))
  .catch((err) => console.log(err));

module.exports = client;
