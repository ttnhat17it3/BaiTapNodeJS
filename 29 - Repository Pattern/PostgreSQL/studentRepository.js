const client = require("./connectDB.js");

class StudentRepository {
  getAll() {
    const query = "SELECT * FROM students WHERE status = TRUE";
    return client.query(query).then((data) => data.rows);
  }

  getById(id) {
    const query = `SELECT * FROM students WHERE id = ${id} AND status = TRUE`;
    return client.query(query).then((data) => data.rows);
  }

  add(newStudent) {
    const query = `INSERT INTO students(name, age, subjects, type, money) VALUES ('${newStudent.name}', ${newStudent.age}, '{${newStudent.subjects}}', '${newStudent.type}', ${newStudent.money})`;
    return client.query(query);
  }

  edit(id, newStudent) {
    let query = "UPDATE students SET ";
    for (let key in newStudent) {
      const keyValue = `${key} = ${newStudent[key]}, `;
      query = query.concat(keyValue);
    }
    // Delete the lastest "," and concatenate query string
    query = query.slice(0, query.length - 1).concat(` WHERE id = ${id}`);

    return client.query(query);
  }

  softedDelete(id) {
    return client.query(`UPDATE students SET status = FALSE WHERE id = ${id}`);
  }

  //   findByType(type, page, size) {
  //     const query = `SELECT * FROM students WHERE status = TRUE AND type = ${type}`;
  //     return client
  //       .query(query)
  //       .then((data) => data.rows.slice(size * (page - 1), size * page));
  //   }
}

module.exports = new StudentRepository();
