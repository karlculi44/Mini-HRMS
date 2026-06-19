function EmployeeModal({
  editingId,
  formData,
  handleChange,
  handleSubmit,
  handleCloseModal,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Employee" : "Add Employee"}
        </h2>

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
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
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
