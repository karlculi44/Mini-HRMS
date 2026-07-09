import db from "../config/db.js";

export const createUser = async (email, password) => {
  const [result] = await db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
  );
  return result;
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows;
};

export const findUserForLogin = async (email) => {
  const [rows] = await db.query(
    "SELECT id, email, password FROM users WHERE email = ?",
    [email],
  );

  return rows;
};

export const findUserById = async (id) => {
  const [rows] = await db.query("SELECT id, email FROM users WHERE id = ?", [
    id,
  ]);
  return rows[0];
};
