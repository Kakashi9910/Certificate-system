import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const generateCertificate = (payload) => {
  return axios.post(`${API_URL}/generate`, payload);
};
