import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "karlculi@rootpassword123",
  database: "mini_hrms",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
