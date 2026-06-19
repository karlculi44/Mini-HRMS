import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

export async function getDashboardStats() {
  const { data } = await axios.get(API_URL);
  return data;
}
