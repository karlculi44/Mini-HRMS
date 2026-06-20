import axios from "axios";

const API_URL = "https://mini-hrms-jjva.onrender.com/api/dashboard";

export async function getDashboardStats() {
  const { data } = await axios.get(API_URL);
  return data;
}
