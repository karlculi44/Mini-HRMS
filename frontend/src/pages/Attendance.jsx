import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getEmployees } from "../services/employeeServices.js";
import {
  getAttendance,
  createAttendance,
  updateAttendance,
} from "../services/attendanceServices.js";
import { formatDate } from "../helpers/formatDate.js";
import AttendanceModal from "../components/AttendaceModal.jsx";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);

  const [formData, setFormData] = useState({
    employee_id: "",
    attendance_date: "",
    time_in: "",
    time_out: "",
    status: "Present",
  });

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  async function fetchAttendance() {
    try {
      const data = await getAttendance();
      setAttendance(data);
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

  function handleEditAttendance(attend) {
    setEditingAttendance(attend.employee_id);

    setFormData({
      employee_id: attend.employee_id,
      attendance_date: attend.attendance_date,
      time_in: attend.time_in,
      time_out: attend.time_out,
      status: attend.status,
    });

    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);
      if (editingAttendance) {
        await updateAttendance(editingAttendance, formData);
      } else {
        console.log(formData);
        await createAttendance(formData);
      }

      await fetchAttendance();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingAttendance(null);

    setFormData({
      employee_id: "",
      attendance_date: "",
      time_in: "",
      time_out: "",
      status: "Present",
    });
  }

  return (
    <div className="space-y-6">
      {showModal && (
        <AttendanceModal
          editingAttendance={editingAttendance}
          employees={employees}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCloseModal={handleCloseModal}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold pt-10">
            Attendance Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Track employee attendance, work hours, and daily time records.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary w-full sm:w-auto px-5 py-2 bg-blue-500 text-white rounded-full text-sm sm:text-base"
        >
          Record Attendance
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                Employee
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">Date</th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden sm:table-cell">
                Time In
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden md:table-cell">
                Time Out
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                Status
              </th>
              <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {attendance.length > 0 ? (
              attendance.map((attend) => (
                <tr
                  key={attend.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-2 sm:p-4 text-xs sm:text-sm">
                    {attend.full_name}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm">
                    {formatDate(attend.attendance_date)}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm hidden sm:table-cell">
                    {attend.time_in}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm hidden md:table-cell">
                    {attend.time_out}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm">
                    {attend.status}
                  </td>
                  <td className="p-2 sm:p-4">
                    <button
                      onClick={() => handleEditAttendance(attend)}
                      className="px-2 sm:px-4 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 cursor-pointer transition-all text-xs sm:text-sm"
                    >
                      <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-4 sm:p-6 text-center text-gray-500 text-sm sm:text-base"
                >
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
