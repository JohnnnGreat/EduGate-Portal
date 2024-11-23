import { AxiosError } from "axios";
import axiosUserClient from "./axiosClient";

export const getAllTransactionsByUser = async () => {
   try {
      const response = await axiosUserClient.get("/api/payments/student");
      console.log(response);
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};
