import axios from "axios";

const API_URL = "https://mini-hrms-jjva.onrender.com/api/payroll";

export async function getPayrolls() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function generatePayroll(employeeId) {
  return axios.post(`${API_URL}/${employeeId}`);
}
