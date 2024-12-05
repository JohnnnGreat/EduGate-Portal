"use client";
import React, { useState } from "react";
import PaymentsHeader from "./PaymentsHeader";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import SelectField from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { generateReportType } from "@/lib/api/transactions";
import { Divider } from "antd";
import { toast } from "react-toastify";
import PaymentReport from "./PaymentReport";
import Link from "next/link";

const reportTypeEnum = z.enum([
   "Paid Students Report",
   "Outstanding Payments Report",
   "Revenue Breakdown",
]);

const paymentSchema = z.object({
   reportType: reportTypeEnum,
});
const GenerateRecordsComponent = () => {
   const paymentOptions = [
      { label: "Revenue Breakdown", value: "Revenue Breakdown" },
      { label: "Outstanding Payments Report", value: "Outstanding Payments Report" },
      { label: "Paid Students Report", value: "Paid Students Report" },
   ];

   const form = useForm<z.infer<typeof paymentSchema>>({
      resolver: zodResolver(paymentSchema),
      defaultValues: {},
   });

   const [isLoading, setIsLoading] = useState(false);

   const [reportPayload, setReportPayload] = useState(null);

   const [fileUrl, setFileUrl] = useState("");
   const onSubmit = async (value: any) => {
      try {
         const response = await generateReportType(value.reportType);
         toast.success(response?.message);

         console.log(response);
         setReportPayload(response?.payload);

         setFileUrl(response?.fileUrl);
      } catch (error) {
         toast.error(error?.message);
         console.log(error);
      }
   };

   return (
      <div>
         <PaymentsHeader
            title="Generate Payment Report"
            description="Access and Manage Comprehensive Payment Records"
         />

         <div>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  <SelectField
                     name="reportType"
                     label="Select the type of report to generate"
                     form={form}
                     items={paymentOptions}
                     placeholder="Select"
                     className="border bg-gray-300"
                  />

                  <Button>Cotinue</Button>
               </form>
            </Form>

            {reportPayload && (
               <div>
                  <Link href={fileUrl}>Download Pdf</Link>
                  <PaymentReport
                     totalAmount={reportPayload?.total}
                     paidStudents={reportPayload?.paidStudents ?? []}
                     paymentType={reportPayload?.paymentType ?? []}
                  />
               </div>
            )}
         </div>
      </div>
   );
};

export default GenerateRecordsComponent;
