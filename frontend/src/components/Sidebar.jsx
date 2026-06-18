import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-5">
      <h1 className="text-xl font-bold mb-8">HRMS</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/salaries">Salaries</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/payroll">Payroll</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
