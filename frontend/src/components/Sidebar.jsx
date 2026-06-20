import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg ${isActive ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-gray-700 transition-all"}`;

  return (
    <aside className="w-64 min-h-screen bg-gray-800 p-4">
      <h1 className="text-2xl font-bold text-white mb-8">HRMS</h1>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/employees" className={linkClass}>
          Employees
        </NavLink>

        <NavLink to="/salaries" className={linkClass}>
          Salaries
        </NavLink>

        <NavLink to="/attendance" className={linkClass}>
          Attendance
        </NavLink>

        <NavLink to="/payroll" className={linkClass}>
          Payroll
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
