import axios from "axios";

export const API_BASE_URL = "https://vectorr-latest.onrender.com";


const api = axios.create({baseURL:API_BASE_URL});

const jwt = localStorage.getItem("jwt");

api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

api.defaults.headers.post["Content-Type"] = "applocation/json";

export default api;