import { AxiosError } from "axios";
import { axiosAdminClient } from "./axiosClient";
import { Login, LoginResponse } from "@/types";

export const loginAdmin = async (data: Login): Promise<LoginResponse> => {
   try {
      const response = await axiosAdminClient.post("/admin/login", data);
      return response.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};
export const loginAdminEmail = async (data: Login): Promise<LoginResponse> => {
   try {
      const response = await axiosAdminClient.post("/admin/login-email", data);
      return response.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};

export const fetchAdminData = async () => {
   try {
      // Use identifier to dynamically fetch user data from the server
      const response = await axiosAdminClient.get(`/admin/get-admin-info/`);
      return response.data;
   } catch (error) {
      throw new Error("An unexpected error occurred");
   }
};
