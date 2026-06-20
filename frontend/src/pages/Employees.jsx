import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { formatDate } from "../helpers/formatDate.js";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  removeEmployee,
} from "../services/employeeServices.js";
import EmployeeModal from "../components/EmployeeModal.jsx";

function Employees() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
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

  function deleteEmployee(employee) {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    try {
      await removeEmployee(employeeToDelete);

      await fetchEmployees();

      setShowDeleteModal(false);
      setEmployeeToDelete(null);
    } catch (error) {
      console.error(error);
    }
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

      {/*Confirm Delete Modal*/}
      {showDeleteModal && (
        <ConfirmDeleteModal
          setShowDeleteModal={setShowDeleteModal}
          setEmployeeToDelete={setEmployeeToDelete}
          confirmDelete={confirmDelete}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold pt-15 lg:pt-0">
            Employee Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage employee records, job details, and workforce information.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary bg-blue-500 text-white rounded-full w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2"
        >
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                  Employee ID
                </th>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                  Full Name
                </th>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden sm:table-cell">
                  Email
                </th>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden md:table-cell">
                  Contact
                </th>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden lg:table-cell">
                  Department
                </th>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden lg:table-cell">
                  Position
                </th>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden md:table-cell">
                  Date Hired
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
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    <td className="p-2 sm:p-4">
                      <b className="text-xs sm:text-sm">
                        {employee.employee_id}
                      </b>
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm">
                      {employee.full_name}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm hidden sm:table-cell">
                      {employee.email}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm hidden md:table-cell">
                      {employee.contact_number}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm hidden lg:table-cell">
                      {employee.department}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm hidden lg:table-cell">
                      {employee.position}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm hidden md:table-cell">
                      {formatDate(employee.date_hired)}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm">
                      {employee.employment_status}
                    </td>

                    <td className="p-2 sm:p-4">
                      <div className="flex gap-1 sm:gap-2 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="px-2 sm:px-4 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 cursor-pointer transition-all text-xs sm:text-sm"
                        >
                          <Pencil className="w-3  sm:w-4 " />
                        </button>

                        <button
                          onClick={() => deleteEmployee(employee.id)}
                          className="px-2 sm:px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer transition-all text-xs sm:text-sm"
                        >
                          <Trash2 className="w-3 sm:w-4 " />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="p-4 sm:p-6 text-center text-gray-500 text-sm sm:text-base"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employees;
