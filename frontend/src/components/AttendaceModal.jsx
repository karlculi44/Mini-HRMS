function AttendanceModal({
  editingAttendance,
  employees,
  formData,
  handleChange,
  handleSubmit,
  handleCloseModal,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {editingAttendance ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
          >
            <option value="">Select Employee</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.full_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="attendance_date"
            value={formData.attendance_date}
            onChange={handleChange}
          />

          <input
            type="time"
            name="time_in"
            value={formData.time_in}
            onChange={handleChange}
          />

          <input
            type="time"
            name="time_out"
            value={formData.time_out}
            onChange={handleChange}
          />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Present</option>
            <option>Late</option>
            <option>Absent</option>
            <option>On Leave</option>
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
              {editingAttendance ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttendanceModal;
