function SalaryModal({
  editingSalary,
  formData,
  employees,
  handleChange,
  handleSubmit,
  handleCloseModal,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4 z-50">
      <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-lg border-2 border-gray-200 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          {editingSalary ? "Update Salary" : "Manage Salary"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {editingSalary ? (
            <div className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-sm sm:text-base">
              <span className="font-semibold text-gray-800">
                {employees.find(
                  (employee) =>
                    String(employee.id) === String(formData.employee_id),
                )?.full_name || "Selected Employee"}
              </span>
            </div>
          ) : (
            <select
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className="w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            >
              <option value="">Select Employee</option>

              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.full_name}
                </option>
              ))}
            </select>
          )}

          <input
            type="number"
            name="basic_salary"
            placeholder="Basic Salary"
            value={formData.basic_salary}
            onChange={handleChange}
            className="w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />

          <input
            type="number"
            name="allowance"
            placeholder="Allowance"
            value={formData.allowance}
            onChange={handleChange}
            className="w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />

          <input
            type="number"
            name="deductions"
            placeholder="Deductions"
            value={formData.deductions}
            onChange={handleChange}
            className="w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn-primary px-4 py-2 rounded-full bg-gray-400 hover:bg-gray-500 cursor-pointer text-sm sm:text-base transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer text-sm sm:text-base transition-all"
            >
              {editingSalary ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SalaryModal;
