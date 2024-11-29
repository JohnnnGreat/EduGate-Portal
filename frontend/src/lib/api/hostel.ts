import { AxiosError } from "axios";
import axiosUserClient from "./axiosClient";

interface Toast {
   success: (message: string) => void;
   error: (message: string) => void;
}

interface Router {
   push: (url: string) => void;
}

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

export const applyForHostel = async (hostelId: string, toast: Toast, router: Router) => {
   try {
      const response = await axiosUserClient.get(`/hostel/apply/${hostelId}`);

      toast.success(response?.data?.message);

      router.push("/accounts/user/dashboard/hostel");
      return response?.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         toast.error(error?.response?.data?.message);
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};
export const checkBookingInformation = async () => {
   try {
      const response = await axiosUserClient.get(`/hostel/check-booking`);

      return response?.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};

export const cancelBooking = async (bookingId: string, toast: Toast, router: Router) => {
   try {
      const response = await axiosUserClient.delete(`/hostel/cancel-booking/${bookingId}`);

      toast.success(response.data.message);
   } catch (error) {
      toast.error("An Error had occured in the process");
   }
};
