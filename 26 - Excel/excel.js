const xlsx = require("xlsx");
const path = require("path");

// Export
// node excel.js outputFiles\excel-from-js.xlsx
const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
  const workBook = xlsx.utils.book_new();
  const workSheetData = [workSheetColumnNames, ...data];
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  xlsx.writeFile(workBook, path.resolve(filePath));
};

const exportUsersToExcel = (
  users,
  workSheetColumnNames,
  workSheetName,
  filePath
) => {
  const data = users.map((user) => {
    return [user.id, user.name, user.age];
  });
  exportExcel(data, workSheetColumnNames, workSheetName, filePath);
};

const users = [
  {
    id: 0,
    name: "Bin",
    age: 23,
  },
  {
    id: 1,
    name: "Bon",
    age: 25,
  },
];

const workSheetColumnName = ["ID", "Name", "Age"];

const workSheetName = "Users";
const filePath = "./outputFiles/excel-from-js.xlsx";

exportUsersToExcel(users, workSheetColumnName, workSheetName, filePath);

const filePath = process.argv.slice(2)[0];
const workbook = xlsx.readFile(filePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Import
let posts = [];
let post = {};

for (let cell in worksheet) {
  const cellAsString = cell.toString();

  if (
    cellAsString[1] !== "r" &&
    cellAsString[1] !== "m" &&
    cellAsString[1] > 1
  ) {
    if (cellAsString[0] === "A") {
      post.title = worksheet[cell].v;
    }
    if (cellAsString[0] === "B") {
      post.author = worksheet[cell].v;
    }
    if (cellAsString[0] === "C") {
      post.released = worksheet[cell].v;
      posts.push(post);
      post = {};
    }
  }
}

console.log(posts);
