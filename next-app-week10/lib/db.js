import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "prts",
  user: "root",
  password: "Kori-san@2545",
  database: "nextshop",
});

export default db;
