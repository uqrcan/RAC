import axios from "axios";
import { refreshToken, logout } from "./auth";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// İstek interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Yanıt interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000",
// });

// // İstek interceptor
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default API;
