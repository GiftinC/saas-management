import axios from "axios";

const FE_URL = import.meta.env.VITE_FE_URL;
const API = axios.create({
  baseURL: `${FE_URL}/api`,
});

export default API;
