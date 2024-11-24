import axiosUserClient from "./axiosClient";
import { AxiosError } from "axios";

export const createAdmission = async (data: any): Promise<AdmissionResponse> => {
   try {
      const response = await axiosUserClient.post("/admission/create-admission", data);
      return response?.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};

export const updateAdmission = async (data: any) => {
   try {
      const response = await axiosUserClient.post("/admission/update-admission", data);
      response?.data;
      return response.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};

export const getAdmission = async () => {
   try {
      const response = await axiosUserClient.get("/admission/get-admission");

      return response.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};
