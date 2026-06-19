import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { formatDate } from "../helpers/formatDate.js";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  removeEmployee,
} from "../services/employeeServices.js";
import EmployeeModal from "../components/EmployeeModal.jsx";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    contact_number: "",
    position: "",
    department: "",
    date_hired: "",
    employment_status: "Active",
  });

  //Load employeed when page loads.
  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const data = await getEmployees();

      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteEmployee(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee? This action can not be undone.",
    );

    if (!confirmed) return;

    try {
      await removeEmployee(id);

      await fetchEmployees();
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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
      } else {
        await createEmployee(formData);
      }

      fetchEmployees();

      setShowModal(false);

      setFormData({
        employee_id: "",
        full_name: "",
        email: "",
        contact_number: "",
        position: "",
        department: "",
        date_hired: "",
        employment_status: "Active",
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(employee) {
    setEditingId(employee.id);

    setFormData({
      employee_id: employee.employee_id,
      full_name: employee.full_name,
      email: employee.email,
      contact_number: employee.contact_number,
      position: employee.position,
      department: employee.department,
      date_hired: employee.date_hired,
      employment_status: employee.employment_status,
    });

    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingId(null);

    setFormData({
      employee_id: "",
      full_name: "",
      email: "",
      contact_number: "",
      position: "",
      department: "",
      date_hired: "",
      employment_status: "Active",
    });
  }

  return (
    <div className="space-y-6">
      {/*Modal Component*/}
      {showModal && (
        <EmployeeModal
          editingId={editingId}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCloseModal={handleCloseModal}
        />
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employees</h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer"
        >
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee ID</th>
              <th className="p-4 text-left">Full Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Position</th>
              <th className="p-4 text-left">Date Hired</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{employee.employee_id}</td>
                  <td className="p-4">{employee.full_name}</td>
                  <td className="p-4">{employee.email}</td>
                  <td className="p-4">{employee.contact_number}</td>
                  <td className="p-4">{employee.department}</td>
                  <td className="p-4">{employee.position}</td>
                  <td className="p-4">{formatDate(employee.date_hired)}</td>
                  <td className="p-4">{employee.employment_status}</td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="px-6 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteEmployee(employee.id)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
