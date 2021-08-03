const Student = require("./models/Student");

class StudentReposiroty {
  constructor() {}

  getAll() {
    return Student.find();
  }

  getById(id) {
    return Student.findById(id);
  }

  add(newStudent) {
    const student = new Student(newStudent);
    return student.save();
  }

  edit(id, newStudent) {
    return Student.findOneAndUpdate({ _id: id }, newStudent);
  }

  softedDelete(id) {
    return Student.findOneAndUpdate({ _id: id }, { status: false });
  }
}

module.exports = new StudentReposiroty();
