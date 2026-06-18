import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees.jsx";
import Salaries from "./pages/Salaries.jsx";
import Attendance from "./pages/Attendance.jsx";
import Payroll from "./pages/Payroll.jsx";
import MainLayout from "./layout/MainLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/employees" element={<Employees />} />

          <Route path="/salaries" element={<Salaries />} />

          <Route path="/attendance" element={<Attendance />} />

          <Route path="/payroll" element={<Payroll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
