import axios from "axios";

const API_URL = "https://mini-hrms-jiva.onrender.com/api/employees";

export async function getEmployees() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createEmployee(employeeData) {
  return axios.post(API_URL, employeeData);
}

export async function updateEmployee(editingId, employeeData) {
  return axios.put(`${API_URL}/${editingId}`, employeeData);
}

export async function removeEmployee(id) {
  return axios.delete(`${API_URL}/${id}`);
}
