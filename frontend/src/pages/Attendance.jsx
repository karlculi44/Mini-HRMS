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

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-gray-500 mt-1">
            Track employee attendance, work hours, and daily time records.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary px-5 py-2 bg-blue-500 text-white rounded-full"
        >
          Record Attendance
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time In</th>
              <th className="p-4 text-left">Time Out</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {attendance.length > 0 ? (
              attendance.map((attend) => (
                <tr
                  key={attend.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4">{attend.full_name}</td>
                  <td className="p-4">{formatDate(attend.attendance_date)}</td>
                  <td className="p-4">{attend.time_in}</td>
                  <td className="p-4">{attend.time_out}</td>
                  <td className="p-4">{attend.status}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEditAttendance(attend)}
                      className="px-4 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 cursor-pointer transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
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
