import db from "./db.js";

//test database connection
try {
  await db.query("SELECT 1");
  console.log("DB Connected Successfully");
} catch (err) {
  console.error("DB Error:", err);
}
