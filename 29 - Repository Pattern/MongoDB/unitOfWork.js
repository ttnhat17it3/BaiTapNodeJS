const studentRepository = require("./studentReposiroty");

class UnitOfWork {
  constructor() {
    this.studentRepository = studentRepository;
  }
}

module.exports = new UnitOfWork();
