const mongoose = require("mongoose");

connectDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/training", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log("Connect Success!");
};

module.exports = { connectDb };
