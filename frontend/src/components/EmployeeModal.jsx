function EmployeeModal({
  editingId,
  formData,
  handleChange,
  handleSubmit,
  handleCloseModal,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4 z-50">
      <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-gray-200 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          {editingId ? "Edit Employee" : "Add Employee"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            name="employee_id"
            placeholder="Employee ID"
            value={formData.employee_id}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            name="contact_number"
            placeholder="Contact Number"
            value={formData.contact_number}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            type="date"
            name="date_hired"
            value={formData.date_hired}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <select
            name="employment_status"
            value={formData.employment_status}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option>Active</option>
            <option>Offline</option>
            <option>On Leave</option>
            <option>Resigned</option>
          </select>

          <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn-primary px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-lg text-sm sm:text-base transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm sm:text-base transition-all"
            >
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;
