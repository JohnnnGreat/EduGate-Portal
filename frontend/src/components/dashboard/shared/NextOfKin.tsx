"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { updateAdmission } from "@/lib/api/admission";
import useGetAdmission from "@/hooks/useGetAdmission";
import SelectField from "@/components/form/SelectField";
import TextField from "@/components/form/TextField";
import { departmentMapping, faculties } from "../../constants";
import { X } from "lucide-react";

const nextOfKinSchema = z.object({
   name: z.string().min(2, { message: "Academic session must be at least 2 characters." }),
   email: z.string().min(5, { message: "Email Must be at least 5 characters." }),
   address: z.string(),
   phone: z.string(),
   relationship: z.string(),
});

const NextOfKin = ({ handler }) => {
   const form = useForm<z.infer<typeof nextOfKinSchema>>({
      resolver: zodResolver(nextOfKinSchema),
      defaultValues: {},
   });

   const [isError, setIsError] = useState(false);
   const router = useRouter();
   const stepLevel = useSearchParams().get("idx");
   const applicationLevel = JSON.parse(localStorage.getItem("applicationLevel") ?? "0");

   const { mutateAsync, isPending } = useMutation({
      mutationFn: (values: z.infer<typeof nextOfKinSchema>) => updateAdmission(values),
      onError: (error: any) => {
         toast.error(error.message);
         setIsError(true);
      },
      onSuccess: (data) => {
         toast.success(data.message);
         console.log(data);
      },
   });

   const { isValid, isSubmitting } = form.formState;

   const { data: response } = useGetAdmission();

   const onSubmit = async (values: z.infer<typeof nextOfKinSchema>) => {
      console.log(values);
      await mutateAsync(values);
      form.reset();
   };

   return (
      <div className=" rounded-2xl mt-4 h-screen bg-[#000]/70 z-30 w-full absolute top-0 flex items-center justify-center">
         <div className="p-8 bg-white w-[600px] rounded-[20px] relative">
            <X
               className="absolute top-3 right-3 cursor-pointer"
               onClick={() => handler()}
            />
            <h1 className="text-xl font-bold mb-2">Next of Kin Information</h1>
            <p className="text-base text-gray-500">Please Enter your next of kin information.</p>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  <TextField
                     label="Name"
                     name="name"
                     form={form}
                     placeholder="Enter Next of Kin Name"
                     className="border bg-gray-300"
                  />
                  <TextField
                     label="Email"
                     name="email"
                     form={form}
                     placeholder="Enter Next of Email Address"
                     className="border bg-gray-300"
                  />
                  <TextField
                     label="Phone Number"
                     name="phone"
                     form={form}
                     placeholder="Enter Next of Phone Number"
                     className="border bg-gray-300"
                  />

                  <SelectField
                     name="relationship"
                     label="Relationship"
                     form={form}
                     items={[
                        { value: "Father", label: "Father" },
                        { value: "Mother", label: "Mother" },
                        { value: "Sibling", label: "Sibling" },
                        { value: "Guardian", label: "Guardian" },
                     ]}
                     placeholder="Select Next of Kin Relationship"
                     className="border bg-gray-300"
                  />

                  <TextField
                     label="Physical Address"
                     name="address"
                     form={form}
                     placeholder="Enter Next of Kin Physical Address"
                     className="border bg-gray-300"
                  />

                  <div className="flex gap-4">
                     <Button
                        type="submit"
                        className="bg-[#02333F] py-4 px-8 font-bold"
                     >
                        Save Information
                     </Button>
                  </div>
               </form>
            </Form>{" "}
         </div>
      </div>
   );
};

export default NextOfKin;
