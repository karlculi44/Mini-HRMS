import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { formatDate } from "../helpers/formatDate.js";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    contact_number: "",
    position: "",
    department: "",
    date_hired: "",
    employment_status: "Active",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/employees");

      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/employees", formData);

      fetchEmployees();

      setShowModal(false);

      setFormData({
        employee_id: "",
        full_name: "",
        email: "",
        contact_number: "",
        position: "",
        department: "",
        date_hired: "",
        employment_status: "Active",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      {/*Modal Component*/}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Add Employee</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                name="employee_id"
                placeholder="Employee ID"
                value={formData.employee_id}
                onChange={handleChange}
                className="p-3 rounded-lg shadow-sm"
              />

              <input
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                className="p-3 rounded-lg shadow-sm"
              />

              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-lg shadow-sm"
              />

              <input
                name="contact_number"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleChange}
                className="p-3 rounded-lg shadow-sm"
              />

              <input
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                className="p-3 rounded-lg shadow-sm"
              />

              <input
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="p-3 rounded-lg shadow-sm"
              />

              <input
                type="date"
                name="date_hired"
                value={formData.date_hired}
                onChange={handleChange}
                className="p-3 rounded-lg shadow-sm"
              />

              <select
                name="employment_status"
                value={formData.employment_status}
                onChange={handleChange}
                className="p-3 rounded-lg shadow-sm"
              >
                <option>Active</option>
                <option>Offline</option>
                <option>On Leave</option>
                <option>Resigned</option>
              </select>

              <div className="col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employees</h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer"
        >
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee ID</th>
              <th className="p-4 text-left">Full Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Position</th>
              <th className="p-4 text-left">Date Hired</th>
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
                  <td className="p-4">{employee.email}</td>
                  <td className="p-4">{employee.contact_number}</td>
                  <td className="p-4">{employee.department}</td>
                  <td className="p-4">{employee.position}</td>
                  <td className="p-4">{formatDate(employee.date_hired)}</td>
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
