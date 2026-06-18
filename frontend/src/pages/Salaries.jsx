import { useState, useEffect } from "react";
import axios from "axios";
import { formatCurrency } from "../helpers/formatCurrency.js";

function Salaries() {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSalary, setEditingSalary] = useState(null);

  const [formData, setFormData] = useState({
    employee_id: "",
    basic_salary: "",
    allowance: "",
    deductions: "",
  });

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
  }, []);

  async function fetchSalaries() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/salaries");

      setSalaries(data);
    } catch (error) {
      console.error(error);
    }
  }

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
      await axios.post(`http://localhost:5000/api/salaries/`, formData);

      fetchSalaries();
      handleCancelModal();
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancelModal() {
    setShowModal(false);
    setEditingSalary(null);

    setFormData({
      employee_id: "",
      basic_salary: "",
      allowance: "",
      deductions: "",
    });
  }

  function handleEditSalary(salary) {
    setEditingSalary(salary.employee_id);
    setFormData({
      employee_id: salary.employee_id,
      basic_salary: salary.basic_salary,
      allowance: salary.allowance,
      deductions: salary.deductions,
    });
    setShowModal(true);
  }

  return (
    <div className="space-y-6">
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            {editingSalary ? "Update Salary" : "Manage Salary"}

            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                className="w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Employee</option>

                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.full_name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="basic_salary"
                placeholder="Basic Salary"
                value={formData.basic_salary}
                onChange={handleChange}
                className="w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="number"
                name="allowance"
                placeholder="Allowance"
                value={formData.allowance}
                onChange={handleChange}
                className="w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="number"
                name="deductions"
                placeholder="Deductions"
                value={formData.deductions}
                onChange={handleChange}
                className="w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancelModal}
                  className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                >
                  {editingSalary ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Salary Management</h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 bg-blue-500 text-white rounded-full cursor-pointer"
        >
          Add Salary
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee</th>

              <th className="p-4 text-left">Basic Salary</th>

              <th className="p-4 text-left">Allowance</th>

              <th className="p-4 text-left">Deductions</th>

              <th className="p-4 text-left">Net Salary</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => (
              <tr key={salary.id} className="border-t">
                <td className="p-4">{salary.full_name}</td>
                <td className="p-4">{formatCurrency(salary.basic_salary)}</td>
                <td className="p-4">{formatCurrency(salary.allowance)}</td>
                <td className="p-4">{formatCurrency(salary.deductions)}</td>
                <td className="p-4 font-semibold">
                  {formatCurrency(salary.net_salary)}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleEditSalary(salary)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 cursor-pointer"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Salaries;
