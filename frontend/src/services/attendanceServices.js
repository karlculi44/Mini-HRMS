import axios from "axios";

const API_URL = "http://localhost:5000/api/attendance";

export async function getAttendance() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createAttendance(formData) {
  return axios.post(API_URL, formData);
}

export async function updateAttendance(id, formData) {
  return axios.put(`${API_URL}/${id}`, formData);
}

export async function removeAttendance(id) {
  return axios.delete(`${API_URL}/${id}`);
}
