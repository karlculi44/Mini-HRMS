import { useState, useEffect } from "react";
import { formatCurrency } from "../helpers/formatCurrency.js";
import { getEmployees } from "../services/employeeServices.js";
import SalaryModal from "../components/SalaryModal.jsx";
import { Pencil } from "lucide-react";

import {
  getSalaries,
  createOrUpdateSalary,
} from "../services/salaryServices.js";

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
      const data = await getSalaries();

      setSalaries(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchEmployees() {
    try {
      const data = await getEmployees();

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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createOrUpdateSalary(formData);

      await fetchSalaries();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingSalary(null);

    setFormData({
      employee_id: "",
      basic_salary: "",
      allowance: "",
      deductions: "",
    });
  }

  return (
    <div className="space-y-6">
      {showModal && (
        <SalaryModal
          editingSalary={editingSalary}
          formData={formData}
          employees={employees}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCloseModal={handleCloseModal}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold pt-10">
            Salary Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage employee compensation, deductions, and payroll records.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary w-full sm:w-auto px-5 py-2 bg-blue-500 text-white rounded-full cursor-pointer text-sm sm:text-base"
        >
          Add Salary
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                Employee
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden sm:table-cell">
                Basic Salary
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden md:table-cell">
                Allowance
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden lg:table-cell">
                Deductions
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                Net Salary
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => (
              <tr
                key={salary.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all"
              >
                <td className="p-2 sm:p-4 text-xs sm:text-sm">
                  {salary.full_name}
                </td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm hidden sm:table-cell">
                  {formatCurrency(salary.basic_salary)}
                </td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm hidden md:table-cell">
                  {formatCurrency(salary.allowance)}
                </td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm hidden lg:table-cell">
                  {formatCurrency(salary.deductions)}
                </td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm font-semibold">
                  {formatCurrency(salary.net_salary)}
                </td>

                <td className="p-2 sm:p-4">
                  <button
                    onClick={() => handleEditSalary(salary)}
                    className="px-2 sm:px-4 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 cursor-pointer transition-all text-xs sm:text-sm"
                  >
                    <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
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
