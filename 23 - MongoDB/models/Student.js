const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  subjects: {
    type: Array,
    require: true,
  },
  status: {
    type: Boolean,
  },
  tien: {
    type: Number,
    require: true,
  },
});
