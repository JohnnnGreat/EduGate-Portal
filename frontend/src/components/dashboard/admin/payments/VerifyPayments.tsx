"use client";
import React, { useState } from "react";
import PaymentsHeader from "./PaymentsHeader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "@/components/form/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { verifyTrxAlt } from "@/lib/api/transactions";
import { toast } from "react-toastify";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const payment = z.object({
   reference: z.string().min(2, { message: "Academic session must be at least 2 characters." }),
});
const VerifyPayments = () => {
   const form = useForm<z.infer<typeof payment>>({
      resolver: zodResolver(payment),
      defaultValues: {},
   });

   const [error, setError] = useState("");

   const [isError, setIsError] = useState("");

   const onSubmit = async (values: z.infer<typeof payment>) => {
      try {
         const transactionId = values.reference;
         const response = await verifyTrxAlt(transactionId);

         console.log(response);

         setIsError(false);
      } catch (error) {
         toast.error(error?.message);

         setIsError(true);
         setError(error?.message);
      }
   };

   return (
      <div>
         {" "}
         <PaymentsHeader
            title="Payment Verification"
            description="Quickly Verify Payments with Ease"
         />
         <div className="flex gap-[2rem]">
            <div>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-4 mt-[1rem]"
                  >
                     <TextField
                        label="Enter Payment Reference Number or Receipt Number to confirm payment"
                        name="reference"
                        form={form}
                        className="border bg-gray-300 mt-[1rem"
                        placeholder="Enter Transaction ID"
                     />

                     <div className="flex gap-4">
                        <button
                           type="submit"
                           className="bg-[#02333F]  py-4 px-[3rem] font-bold text-white flex gap-2 rounded-[10px]"
                        >
                           Verify Payment
                        </button>
                     </div>
                  </form>
               </Form>

               {error && (
                  <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                     <AlertCircle className="text-red-500 w-6 h-6" />
                     <div>
                        <h3 className="text-red-800 font-semibold">Verification Failed</h3>
                        <p className="text-red-700 text-sm">{error}</p>
                     </div>
                  </div>
               )}
            </div>
            <div className="p-[1rem]">
               <h1>Bulk Verification</h1>
               <p className="text-[#000]/50 mt-1">
                  Enter Payment Reference Number or Receipt Number to confirm payment
               </p>

               <Button
                  disabled
                  className="mt-[1rem!important] disabled:cursor-not-allowed"
               >
                  Upload CSV
               </Button>
            </div>
         </div>
      </div>
   );
};

export default VerifyPayments;
