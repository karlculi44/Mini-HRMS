import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const { data } = await axios.get("http://localhost:5000/api/employees");

        setEmployees(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employees</h1>

        <button className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee ID</th>

              <th className="p-4 text-left">Full Name</th>

              <th className="p-4 text-left">Department</th>

              <th className="p-4 text-left">Position</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{employee.employee_id}</td>

                  <td className="p-4">{employee.full_name}</td>

                  <td className="p-4">{employee.department}</td>

                  <td className="p-4">{employee.position}</td>

                  <td className="p-4">{employee.employment_status}</td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="px-6 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 cursor-pointer">
                        Edit
                      </button>

                      <button className="px-6 py- bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer">
                        <Trash2 className="w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
