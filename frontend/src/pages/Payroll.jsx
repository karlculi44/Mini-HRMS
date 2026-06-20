import { useState, useEffect } from "react";
import { getPayrolls, generatePayroll } from "../services/payrollServices.js";
import { getEmployees } from "../services/employeeServices.js";
import { formatDate } from "../helpers/formatDate.js";
import { formatCurrency } from "./../helpers/formatCurrency.js";

function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    fetchPayrolls();
    fetchEmployees();
  }, []);

  async function fetchPayrolls() {
    const data = await getPayrolls();
    setPayrolls(data);
  }

  async function fetchEmployees() {
    const data = await getEmployees();
    setEmployees(data);
  }

  async function handleGeneratePayroll() {
    try {
      await generatePayroll(selectedEmployee);

      await fetchPayrolls();

      setSelectedEmployee("");
    } catch (error) {
      console.error(error);
    }
  }
  async function handleGenerateAllPayrolls() {
    try {
      for (const employee of employees) {
        await generatePayroll(employee.id);
      }

      await fetchPayrolls();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payroll Management</h1>
          <p className="text-gray-500 mt-1">
            Generate payroll records, calculate earnings, and manage employee
            payments.
          </p>
        </div>

        <div className="flex gap-3">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="flex items-center gap-3 border rounded-lg border-gray-400 px-2"
          >
            <option value="">Select Employee</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.full_name}
              </option>
            ))}
          </select>

          <button
            onClick={handleGeneratePayroll}
            className="btn-primary px-5 py- bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer flex items-center gap-3"
          >
            Generate Payroll
          </button>

          <button
            onClick={handleGenerateAllPayrolls}
            className="btn-primary  px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer "
          >
            Generate All Payrolls
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Payroll Date</th>
              <th className="p-4 text-left">Basic Salary</th>
              <th className="p-4 text-left">Allowance</th>
              <th className="p-4 text-left">Deductions</th>
              <th className="p-4 text-left">Net Salary</th>
            </tr>
          </thead>

          <tbody>
            {payrolls.length > 0 ? (
              payrolls.map((payroll) => (
                <tr
                  key={payroll.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <td className="p-4">{payroll.full_name}</td>

                  <td className="p-4">{formatDate(payroll.payroll_date)}</td>

                  <td className="p-4">
                    {formatCurrency(payroll.basic_salary)}
                  </td>

                  <td className="p-4">{formatCurrency(payroll.allowance)}</td>

                  <td className="p-4">{formatCurrency(payroll.deductions)}</td>

                  <td className="p-4 font-semibold">
                    {formatCurrency(payroll.net_salary)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No payroll records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payroll;
