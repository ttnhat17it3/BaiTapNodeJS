const mongoose = require("mongoose");
require("dotenv").config();

connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log("Connect Success!");
};

module.exports = { connectDB };
