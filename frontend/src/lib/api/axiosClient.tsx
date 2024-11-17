import axios from "axios";

let accessToken;

if (typeof window !== "undefined" && sessionStorage) {
   accessToken = sessionStorage.getItem("accesstoken");
}

console.log(accessToken);

// Create an Axios instance with a custom configuration
const axiosUserClient = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api", // Fallback to localhost if not defined
   headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
   },
});

export default axiosUserClient;
