"use client";
import { useGetTransactionsByUser } from "@/hooks/useGetTransactionsByUser";
import React, { useEffect, useState } from "react";
import Transactions from "./Transactions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import SelectField from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { getPaymentList, handlePayment, checkPaymentsDone } from "@/lib/api/transactions";
import useUserData from "@/hooks/useUserData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import NextOfKin from "../shared/NextOfKin";

const paymentTypeEnum = z.enum(["Tuition Fee", "Acceptance Fee", "Hostel Fee", "Course Registration Fee", "Library Fine", "Convocation Fee", "Matriculation", "ICT Fee", "Department Fee", "Faculty Fee", "Hostel", "Other"]);

const paymentOptions = [
   { label: "Tuition Fee", value: "Tuition Fee" },
   { label: "Acceptance Fee", value: "Acceptance Fee" },
   { label: "Hostel Fee", value: "Hostel Fee" },
   { label: "Course Registration Fee", value: "Course Registration Fee" },
   { label: "Library Fine", value: "Library Finee" },
   { label: "Convocation Fee", value: "Convocation Fee" },
   { label: "ICT Fee", value: "ICT Fee" },
   { label: "Department Fee", value: "Department Fee" },
   { label: "Faculty Fee", value: "Faculty Fee" },
   { label: "Matriculation", value: "Matriculation" },
   { label: "Other", value: "Other" },
];

const paymentSchema = z.object({
   paymentType: paymentTypeEnum,
});
const PaymentsComponent = () => {
   const { data: transactions } = useGetTransactionsByUser();
   const queryClient = useQueryClient();

   const form = useForm<z.infer<typeof paymentSchema>>({
      resolver: zodResolver(paymentSchema),
      defaultValues: {},
   });

   const { data: userData } = useUserData();

   const [isLoading, setLoading] = useState<String>("");

   const onSubmit = async (value: string) => {
      const paymentTypeString = value.paymentType;
      handlePayment({ setLoading, paymentTypeString, userData, toast });

      // Invalidate transactions query after payment
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
   };

   const [paymentLists, setPaymentLists] = useState([]);

   useEffect(() => {
      getPaymentList().then((response) => setPaymentLists(response.paymentList));
   }, [paymentLists]);

   const [paymentsAllDone, setPaymentsAllDone] = useState<Boolean>(false);
   useEffect(() => {
      checkPaymentsDone().then((response) => setPaymentsAllDone(response.success));
   }, [paymentLists]);

   const [openDialog, setOpenDialog] = useState(false);
   return (
      <>
         {openDialog && <NextOfKin handler={setOpenDialog} />}
         <div>
            <div className="p-[2rem] bg-white rounded-[20px]">
               <h1 className="text-[2rem] font-bold">My Payments</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem] md:h-[300px]">
               {paymentsAllDone ? (
                  <div className="p-[2rem] bg-white rounded-[20px] my-[1rem]">
                     <h1 className="my-[1rem] font-light text-[1.2rem]">All Payments Completed!</h1>
                     <p className="text-[#555] text-[.9rem] mb-[1.5rem] mt-[1rem]">Congratulations! You’ve completed all the necessary payments. However, there are still some steps left to finish your registration. Please proceed to provide additional information as required.</p>
                     <Button
                        onClick={() => {
                           setOpenDialog(true);
                        }}
                        className=" text-white px-[2rem] bg-[#02333F] py-[1rem] rounded-md  transition-all duration-200"
                     >
                        Continue Registration
                     </Button>
                  </div>
               ) : (
                  <div className="p-[2rem] bg-white rounded-[20px] my-[1rem]">
                     <h1 className="my-[1rem] font-light text-[1.2rem]">Make Transaction</h1>

                     <Form {...form}>
                        <form
                           onSubmit={form.handleSubmit(onSubmit)}
                           className="space-y-4"
                        >
                           <SelectField
                              name="paymentType"
                              label="Choose Payment"
                              form={form}
                              items={paymentOptions}
                              placeholder="Select Faculty"
                              className="border bg-gray-300"
                           />

                           <Button>Cotinue</Button>
                        </form>
                     </Form>
                  </div>
               )}

               <div className="p-[2rem] bg-white rounded-[20px] my-[1rem] overflow-y-scroll">
                  <h1 className="my-[1rem] font-light text-[1.2rem]">Required Payments</h1>

                  <div>
                     {" "}
                     {paymentLists?.map((payment) => (
                        <div className="border-b p-[1rem] flex justify-between">
                           <h1 className="text-[.9rem]">{payment?.type}</h1>
                           <p className="text-[#00000079] text-[.7rem]">{payment?.required ? "Required" : "Not Required"}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* ALl Transactions Made  */}
            <div className="p-[2rem] bg-white rounded-[20px] mb-[1rem]">
               <h1 className="my-[1rem] font-light text-[1.2rem]">All Transactions</h1>
               <Transactions trxs={transactions} />
            </div>
         </div>
      </>
   );
};

export default PaymentsComponent;
