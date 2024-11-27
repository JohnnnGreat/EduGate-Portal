import { AxiosError } from "axios";
import axiosUserClient from "./axiosClient";

export const getAllHostels = async (): Promise<any> => {
   try {
      const response = await axiosUserClient.get("/hostel/hostels");
      console.log(response);
      return response?.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};

export const getHostelById = async (id: string): Promise<any> => {
   try {
      const response = await axiosUserClient.get(`/hostel/get-hostel-by-id/${id}`);

      return response?.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};
