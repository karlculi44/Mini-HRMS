function AttendanceModal({
  editingAttendance,
  employees,
  formData,
  handleChange,
  handleSubmit,
  handleCloseModal,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4 z-50">
      <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-2xl border-2 border-gray-200 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          {editingAttendance ? "Edit Attendance" : "Record Attendance"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
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
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            type="time"
            name="time_in"
            value={formData.time_in}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <input
            type="time"
            name="time_out"
            value={formData.time_out}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option>Present</option>
            <option>Late</option>
            <option>Absent</option>
            <option>On Leave</option>
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
              {editingAttendance ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttendanceModal;
