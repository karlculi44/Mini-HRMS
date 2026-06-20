import axios from "axios";

const API_URL = "https://mini-hrms-jjva.onrender.com/apiattendance";

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
