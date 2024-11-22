// checkUserAdmission.ts
import { Login, LoginResponse } from "@/types";
import axiosUserClient from "./axiosClient";
import { AxiosError } from "axios";

interface AdmissionResponse {
   message: string;
   // add other response data types if any
}

export const checkUserAdmission = async (data: { email: string }): Promise<AdmissionResponse> => {
   try {
      const response = await axiosUserClient.post("/user/check-admission", data);
      return response.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};

export const loginUserDashboard = async (data: Login): Promise<LoginResponse> => {
   try {
      const response = await axiosUserClient.post("/user/login-user-dashboard", data);
      return response.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};

export const fetchUserData = async () => {
   try {
      // Use identifier to dynamically fetch user data from the server
      const response = await axiosUserClient.get(`/user/get-user-information/`);
      return response.data;
   } catch (error) {
      throw new Error("An unexpected error occurred");
   }
};

export const fetchAdmissionInformation = async () => {};
