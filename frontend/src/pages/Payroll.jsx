import { useState, useEffect } from "react";
import { getPayrolls, generatePayroll } from "../services/payrollServices.js";
import { getEmployees } from "../services/employeeServices.js";
import { formatDate } from "../helpers/formatDate.js";
import { formatCurrency } from "./../helpers/formatCurrency.js";
import { Printer } from "lucide-react";

function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [printPayroll, setPrintPayroll] = useState(null);

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

  function handlePrint(payroll) {
    setPrintPayroll(payroll);
    setTimeout(() => {
      window.print();
      setPrintPayroll(null);
    }, 100);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 print:hidden">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold pt-15 lg:pt-0">
            Payroll Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Generate payroll records, calculate earnings, and manage employee
            payments.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="flex items-center gap-3 border rounded-lg border-gray-400 px-2 py-1 sm:py-2 text-sm sm:text-base w-full sm:w-auto"
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
            className="btn-primary px-3 sm:px-5 py-1 sm:py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer flex items-center justify-center gap-3 text-xs sm:text-sm w-full sm:w-auto"
          >
            Generate Payroll
          </button>

          <button
            onClick={handleGenerateAllPayrolls}
            className="btn-primary px-3 sm:px-5 py-1 sm:py-2 bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer text-xs sm:text-sm w-full sm:w-auto"
          >
            Generate All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto print:hidden">
        <table className="w-full text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                Employee
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                Payroll Date
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden md:table-cell">
                Basic Salary
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden lg:table-cell">
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
            {payrolls.length > 0 ? (
              payrolls.map((payroll) => (
                <tr
                  key={payroll.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <td className="p-2 sm:p-4 text-xs sm:text-sm">
                    {payroll.full_name}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm">
                    {formatDate(payroll.payroll_date)}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm hidden md:table-cell">
                    {formatCurrency(payroll.basic_salary)}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm hidden lg:table-cell">
                    {formatCurrency(payroll.allowance)}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm hidden lg:table-cell">
                    {formatCurrency(payroll.deductions)}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm font-semibold">
                    {formatCurrency(payroll.net_salary)}
                  </td>
                  <td className="p-2 sm:p-4">
                    <button
                      onClick={() => handlePrint(payroll)}
                      className="px-2 sm:px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer transition-all text-xs sm:text-sm"
                      title="Print Payroll"
                    >
                      <Printer className="w-3 sm:w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-4 sm:p-6 text-center text-gray-500 text-sm sm:text-base"
                >
                  No payroll records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Print Template */}
      {printPayroll && (
        <div className="hidden print:block">
          <style>{`
            @page {
              margin: 0;
              padding: 0;
            }
            body {
              margin: 0;
              padding: 0;
            }
          `}</style>
          <div className="bg-white p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">HRMS Payroll Slip</h1>
              <p className="text-gray-600 mt-2">Confidential</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-2">Employee Information</h3>
                <p>
                  <strong>Name:</strong> {printPayroll.full_name}
                </p>
                <p>
                  <strong>Employee ID:</strong> {printPayroll.employee_id}
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Payroll Information</h3>
                <p>
                  <strong>Payroll Date:</strong>{" "}
                  {formatDate(printPayroll.payroll_date)}
                </p>
              </div>
            </div>

            <table className="w-full mb-8 border-collapse">
              <tbody>
                <tr className="border-b-2 border-gray-800">
                  <td className="py-2 font-bold">Basic Salary</td>
                  <td className="py-2 text-right font-bold">
                    {formatCurrency(printPayroll.basic_salary)}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-2">Allowance</td>
                  <td className="py-2 text-right">
                    {formatCurrency(printPayroll.allowance)}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-2">Deductions</td>
                  <td className="py-2 text-right">
                    {formatCurrency(printPayroll.deductions)}
                  </td>
                </tr>
                <tr className="border-b-2 border-gray-800">
                  <td className="py-4 font-bold text-lg">Net Salary</td>
                  <td className="py-4 text-right font-bold text-lg">
                    {formatCurrency(printPayroll.net_salary)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="text-center text-sm text-gray-600 mt-12">
              <p>
                This is an electronically generated document. No signature
                required.
              </p>
              <p className="mt-2">Printed on: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payroll;
