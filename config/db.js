const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  port: "3309",
  user: "root",
  password: "Kadri976@",
  database: "staffmanagement",
});

module.exports = pool;
