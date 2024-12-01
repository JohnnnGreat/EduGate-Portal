"use client";

import axios from "axios";

// Create the axios instance without the initial token
const axiosUserClient = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
   headers: {
      "Content-Type": "application/json",
   },
});
export const axiosAdminClient = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
   headers: {
      "Content-Type": "application/json",
   },
});

// Add a request interceptor to get the latest token before each request
axiosUserClient.interceptors.request.use((config) => {
   const token = localStorage.getItem("EdAccess");

   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});
axiosAdminClient.interceptors.request.use((config) => {
   const token = localStorage.getItem("EdAccess");

   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

export default axiosUserClient;
