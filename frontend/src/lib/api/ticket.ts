// checkUserAdmission.ts
import { Login, LoginResponse } from "@/types";
import axiosUserClient from "./axiosClient";
import { AxiosError } from "axios";

interface AdmissionResponse {
   message: string;
   // add other response data types if any
}

export const createTickets = async (data: any) => {
   try {
      const response = await axiosUserClient.post("/tickets/create-tickets", data);
      return response.data;
   } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};
