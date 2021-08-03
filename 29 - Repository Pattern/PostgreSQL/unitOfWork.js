const studentRepository = require("./studentRepository");

class UnitOfWork {
  constructor() {
    this.studentRepository = studentRepository;
  }
}

module.exports = new UnitOfWork();
