import axios from "axios";

const API_URL = "https://mini-hrms-jiva.onrender.com/api/salaries";

export async function getSalaries() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createOrUpdateSalary(salaryData) {
  return axios.post(API_URL, salaryData);
}
