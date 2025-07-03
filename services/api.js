// // services/api.js

// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = "http://192.168.1.5:8000/api"; // Change to your LAN IP

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Attach token to all requests automatically
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("authToken");
//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }
//   return config;
// });

// export default api;
