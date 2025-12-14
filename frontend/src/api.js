import axios from "axios";

const API_URL = "https://certificate-system-qcej.onrender.com/api";

export const generateCertificate = (payload) => {
  return axios.post(`${API_URL}/generate`, payload);
};
