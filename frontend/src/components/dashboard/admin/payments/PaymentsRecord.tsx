"use client";
import { Form } from "@/components/ui/form";
import PaymentsHeader from "./PaymentsHeader";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "@/components/form/TextField";
import { Loader2, Search } from "lucide-react";
import TransactionsTable from "./TransactionsTable";
import { Divider, message } from "antd";
import SelectField from "@/components/form/SelectField";
import { exportTransactions } from "@/lib/api/transactions";
import { toast } from "react-toastify";

const payment = z.object({
   reference: z.string().min(2, { message: "Academic session must be at least 2 characters." }),
});

const exportOptions = z.object({
   format: z.enum(["csv", "xlsx"]),
});
const PaymentsRecord = () => {
   const form = useForm<z.infer<typeof payment>>({
      resolver: zodResolver(payment),
      defaultValues: {},
   });

   const exportForm = useForm<z.infer<typeof exportOptions>>({
      resolver: zodResolver(exportOptions),
      defaultValues: {},
   });

   const { isValid, isSubmitting } = form.formState;

   const onSubmit = async (values: z.infer<typeof payment>) => {
      console.log(values);
   };

   const [isLoading, setIsLoading] = useState(false);

   const onExportSelected = async (values: z.infer<typeof exportOptions>) => {
      try {
         const format = values?.format;

         const response = await exportTransactions(format);

         console.log(response);
      } catch (error) {
         toast.error(error?.message);
      }
   };

   const onError = (err) => {
      console.log(exportForm);
      console.log(err);
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
                  onSubmit={form.handleSubmit(onSubmit, onError)}
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

            <TransactionsTable />

            <Divider />

            <h1 className="font-bold">Export Transactions</h1>
            <p className="text-gray-500">Supported Extensions, CSV, EXCEL</p>

            <Form {...exportForm}>
               <form
                  onSubmit={exportForm.handleSubmit(onExportSelected, onError)}
                  className="space-y-4 mt-[1rem]"
               >
                  <SelectField
                     name="format"
                     label="Select Export Format"
                     form={exportForm}
                     items={[
                        { value: "xlsx", label: ".xlsx" },
                        { value: "csv", label: ".csv" },
                     ]}
                     placeholder="Select the format you want to export to...."
                     className="border bg-gray-300"
                  />

                  <div className="flex gap-4">
                     <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#02333F] cursor-pointer  py-3 px-[2rem] font-bold text-white flex gap-2 rounded-[10px]"
                     >
                        Export
                        {isLoading && <Loader2 />}
                     </button>
                  </div>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default PaymentsRecord;
