import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import employeeRoutes from "./routes/employees.js";
import salaryRoutes from "./routes/salaries.js";
import attendanceRoutes from "./routes/attendance.js";
import payrollRoutes from "./routes/payroll.js";
import dashboardRoutes from "./routes/dashboard.js";
import db from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  }),
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/salaries", salaryRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.json({ message: "HRMS API running" });
});
app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
