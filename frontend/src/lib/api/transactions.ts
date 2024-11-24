import { AxiosError } from "axios";
import axiosUserClient from "./axiosClient";
import PaystackPop from "@paystack/inline-js";

// Define the type for the payment mapping
interface PaymentMapping {
   [key: string]: number;
}

// Payment mapping object with fee types
const paymentMapping: PaymentMapping = {
   "Acceptance Fee": 20000,
   "Convocation Fee": 10000,
   "Department Fee": 5000,
   "Faculty Fee": 2000,
   "Course Registration Fee": 7000,
   "Library Fine": 2300,
   "ICT Fee": 7000,
   "Hostel Fee": 100000,
   Matriculation: 15000,
   "Tuition Fee": 150000,
};

// Type for user data
interface UserData {
   data: {
      email: string;
      [key: string]: any;
   };
}

// Type for the toast function
interface Toast {
   error: (message: string) => void;
   success: (message: string) => void;
}

// Type for the response data structure of payment creation
interface PaymentResponse {
   payment: {
      reference: string;
      amount: number;
   };
}

// Get all transactions by user
export const getAllTransactionsByUser = async (): Promise<any> => {
   try {
      const response = await axiosUserClient.get("/payments/student");
      return response?.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};

// Handle payment processing
export const handlePayment = async ({
   setLoading,
   paymentTypeString,
   userData,
   toast,
}: {
   setLoading: (loading: boolean) => void;
   paymentTypeString: string;
   userData: UserData;
   toast: Toast;
}): Promise<void> => {
   const amount = paymentMapping[paymentTypeString];
   try {
      setLoading(true);

      // Step 1: Create the payment on the server
      const response = await axiosUserClient.post<PaymentResponse>("/payments/create", {
         paymentType: paymentTypeString, // Payment type
         amount: amount, // Payment amount
         // Current academic session (can add this if needed)
      });

      const { payment } = response.data;

      // Step 2: Call Paystack to process the payment
      handlePaystackPayment(payment.reference, payment.amount, userData, toast);
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         toast.error(error?.response?.data?.message || "An error occurred during payment");
      }
   } finally {
      setLoading(false);
   }
};

// Handle Paystack payment process
const handlePaystackPayment = (
   reference: string,
   amount: number,
   userData: UserData,
   toast: Toast,
): void => {
   // Load Paystack inline script
   const paystack = PaystackPop.setup({
      key: "pk_test_642faff12375599e2a5b72bad1ee000f88ec51ae", // Paystack public key from environment variable
      email: userData?.data?.email, // Use student's email from user data
      amount: amount * 100, // Paystack expects amount in kobo, so multiply by 100
      reference: reference, // Transaction reference from backend
      onSuccess: (transaction) => {
         console.log(transaction);
         // Payment was successful, redirect user or show success message
         alert("Payment successful! Transaction reference: " + transaction.reference);

         // Optional: Call the backend to verify payment
         verifyPayment(reference, toast);
      },
      onCancel: () => {
         // User cancelled the payment
         alert("Payment was cancelled.");
         toast.error("Payment was cancelled.");
      },
   });

   paystack.openIframe();
};

// Verify the payment status from the server
const verifyPayment = async (reference: string, toast: Toast): Promise<void> => {
   try {
      const response = await axiosUserClient.get(`/payments/verify/${reference}`);
      if (response.data.payment.status === "Success") {
         toast.success("Payment verified successfully!");
      } else {
         toast.error("Payment verification failed.");
      }
   } catch (error) {
      toast.error("Error verifying payment.");
   }
};

// Get the payment list (level-based payments)
export const getPaymentList = async (): Promise<any> => {
   try {
      const response = await axiosUserClient.get("/payments/get-level-based-payments");
      return response?.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};

export const checkPaymentsDone = async (): Promise<any> => {
   try {
      const response = await axiosUserClient.get("/payments/check-major-payments");
      return response?.data;
   } catch (error) {
      if (error instanceof AxiosError && error.response) {
         throw new Error(error.response.data.message || "An error occurred");
      }
      throw new Error("An unexpected error occurred");
   }
};
