import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/login";

export async function loginUser(formData) {
  const { data } = await axios.post(API_URL, formData);
  return data;
}
