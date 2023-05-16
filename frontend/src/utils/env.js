const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL
  : "http://localhost:8080";

const API = {
  URL: API_BASE_URL,
};

export default API;
