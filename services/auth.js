// // services/auth.js
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import api from "./api"; // our Axios instance

// // Sign up user
// export const registerUser = async (form) => {
//   try {
//     const res = await api.post("/users/register/", form);

//     const { token, user } = res.data;

//     await AsyncStorage.setItem("authToken", token);
//     await AsyncStorage.setItem("user", JSON.stringify(user));

//     return res.data;
//   } catch (error) {
//     console.error("Registration Error:", error.message);
//     if (error.response?.data) {
//       throw new Error(error.response.data.detail || "Sign up failed");
//     }
//     throw new Error("Network error");
//   }
// };


// // Sign in user
// export const loginUser = async (form) => {
//   try {
//     const res = await api.post("/users/login/", form);

//     const { token, user } = res.data;

//     await AsyncStorage.setItem("authToken", token);
//     await AsyncStorage.setItem("user", JSON.stringify(user));

//     return res.data;
//   } catch (error) {
//     console.error("Login Error:", error.message);
//     if (error.response?.data) {
//       throw new Error(error.response.data.detail || "Login failed");
//     }
//     throw new Error("Network error");
//   }
// };
