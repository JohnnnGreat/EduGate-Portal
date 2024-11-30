"use client";
import { Form } from "@/components/ui/form";
import PaymentsHeader from "./PaymentsHeader";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "@/components/form/TextField";
import { Search } from "lucide-react";
import TransactionsTable from "./TransactionsTable";

const payment = z.object({
   reference: z.string().min(2, { message: "Academic session must be at least 2 characters." }),
});
const PaymentsRecord = () => {
   const form = useForm<z.infer<typeof payment>>({
      resolver: zodResolver(payment),
      defaultValues: {},
   });

   const { isValid, isSubmitting } = form.formState;

   const onSubmit = async (values: z.infer<typeof payment>) => {
      console.log(values);
   };
   return (
      <div>
         <PaymentsHeader
            title="Payments Record"
            description="Access and Manage Comprehensive Payment Records"
         />

         <div>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-[1rem]"
               >
                  <TextField
                     label="Search for students by Matric Number or Reference ID to view payment history"
                     name="reference"
                     form={form}
                     className="border bg-gray-300 mt-[1rem"
                     placeholder="Enter Transaction ID"
                  />

                  <div className="flex gap-4">
                     <button
                        type="submit"
                        disabled={!isValid}
                        className="bg-[#02333F]  py-4 px-[3rem] font-bold text-white flex gap-2 rounded-[10px]"
                     >
                        <Search /> Search
                     </button>
                  </div>
               </form>
            </Form>

            <TransactionsTable/>
         </div>
      </div>
   );
};

export default PaymentsRecord;
