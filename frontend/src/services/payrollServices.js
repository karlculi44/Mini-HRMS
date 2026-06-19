import axios from "axios";

const API_URL = "http://localhost:5000/api/payroll";

export async function getPayrolls() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function generatePayroll(employeeId) {
  return axios.post(`${API_URL}/${employeeId}`);
}
