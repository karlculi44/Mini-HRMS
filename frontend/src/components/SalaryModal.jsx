function SalaryModal({
  editingSalary,
  formData,
  employees,
  handleChange,
  handleSubmit,
  handleCloseModal,
}) {
  return (
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
              onClick={handleCloseModal}
              className="btn-primary px-4 py-2 rounded-full bg-gray-400 hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
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
