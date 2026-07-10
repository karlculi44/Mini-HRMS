import db from "../config/db.js";
import {
  findUserForLogin,
  createUser,
  findUserByEmail,
  findUserById,
} from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const users = await findUserByEmail(email);

  if (users.length > 0) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await createUser(email, hashedPassword);

  return res.status(201).json({
    message: "User registered successfully",
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const users = await findUserForLogin(email);
  if (users.length === 0) {
    throw new AppError("Invalid credentials", 401);
  }
  const user = users[0];
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  return res.status(200).json({
    message: "Login successful",
  });
});

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await findUserById(req.user.id);

  if (user.length === 0) {
    throw new AppError("User not found", 404);
  }

  return res.status(200).json({
    message: "User info retrieved successfully",
    user: {
      id: user.id,
      email: user.email,
    },
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
});
