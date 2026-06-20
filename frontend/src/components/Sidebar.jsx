import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg ${isActive ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-gray-700 transition-all "}`;

  return (
    <div className=" z-50 ">
      {/* Hamburger Menu Button - visible only on mobile/tablet */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition-all"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - hidden on mobile unless opened */}
      <aside
        className={`fixed left-0 top-0 lg:static w-64 min-h-screen bg-gray-800 p-4 z-40 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <h1 className="text-2xl font-bold text-white mb-8 mt-12 lg:mt-0">
          HRMS
        </h1>

        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/employees"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Employees
          </NavLink>

          <NavLink
            to="/salaries"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Salaries
          </NavLink>

          <NavLink
            to="/attendance"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Attendance
          </NavLink>

          <NavLink
            to="/payroll"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Payroll
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
