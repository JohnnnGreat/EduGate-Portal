"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

import SelectField from "@/components/form/SelectField";
import TextField from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createAdmission } from "@/lib/api/admission";
import useUserData from "@/hooks/useUserData";
import { Save } from "lucide-react";

// Validation schema using zod
const stepOneSchema = z.object({
   email: z.string().min(2, { message: "Email must be at least 2 characters." }),
   fullName: z.string().min(6, { message: "Full Name must be at least 6 characters" }),
   address: z.string().min(6, { message: "Address must be at least 6 characters" }),
   gender: z.string(),
   phoneNumber: z.string().min(6, { message: "Phone Number must be at least 6 characters" }),
});

// Define the type for form data using zod inference
type StepOneFormData = z.infer<typeof stepOneSchema>;

const StepOne: React.FC = () => {
   // Fetch user data
   const { data: response } = useUserData();
   const profileInformation = response?.data;

   // Initialize react-hook-form with TypeScript support
   const form = useForm<StepOneFormData>({
      resolver: zodResolver(stepOneSchema),
      defaultValues: {},
   });

   useEffect(() => {
      if (profileInformation) {
         form.reset({
            email: profileInformation.email || "",
            fullName: `${profileInformation.firstName} ${profileInformation.lastName}`.trim(),
         });
      }
   }, [profileInformation, form]);

   const stepLevel = useSearchParams().get("idx");
   const router = useRouter();
   const [isError, setIsError] = useState(false);

   // Application level
   let applicationLevel = 0;

   // Set up mutation for form submission
   const { mutateAsync } = useMutation({
      mutationFn: (values: StepOneFormData) => createAdmission(values),
      onError: (error: any) => {
         toast.error(error.message);
         setIsError(true);
      },
      onSuccess: (data) => {
         toast.success(data.message);
         router.push(`http://localhost:3000/accounts/user/dashboard/process-admission?idx=1`);
         localStorage.setItem("applicationLevel", JSON.stringify(applicationLevel));
         localStorage.setItem("applicationStarted", JSON.stringify(true));
      },
   });

   const { isValid, isSubmitting } = form.formState;

   // Form submit handler
   const onSubmit: SubmitHandler<StepOneFormData> = async (values) => {
      await mutateAsync(values);
      form.reset();
   };

   return (
      <div className="p-8 bg-white rounded-[20px] mt-4">
         <h1 className="text-xl font-bold mb-2">Your Personal Information</h1>
         <p className="text-base text-gray-500">Let’s start by getting to know you better</p>

         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-2"
            >
               <TextField
                  placeholder="name@email.com"
                  label="Email Address"
                  form={form}
                  defaultValue={profileInformation?.email}
                  disabledField
                  name="email"
                  classname="border-gray-200 bg-gray-100"
               />

               <SelectField
                  items={[
                     { label: "Male", value: "Male" },
                     { label: "Female", value: "Female" },
                  ]}
                  name="gender"
                  placeholder="Choose Gender"
                  label="Gender"
                  form={form}
                  classname="border-gray-200 bg-gray-100"
               />

               <TextField
                  placeholder="John Doe"
                  label="Full Name"
                  form={form}
                  defaultValue={`${profileInformation?.firstName} ${profileInformation?.lastName}`.trim()}
                  disabledField
                  name="fullName"
                  classname="border-gray-200 bg-gray-100"
               />

               <TextField
                  placeholder="9038457675"
                  label="Phone Number"
                  form={form}
                  name="phoneNumber"
                  classname="border-gray-200 bg-gray-100"
               />

               <TextField
                  placeholder="Your Address"
                  label="Address"
                  form={form}
                  name="address"
                  classname="border-gray-200 bg-gray-100"
               />

               <div className="flex justify-between">
                  {stepLevel !== "0" && (
                     <Button
                        className="bg-gray-700 py-4 px-8 font-bold"
                        type="button"
                     >
                        Previous
                     </Button>
                  )}
                  <Button
                     className="bg-[#02333F] py-[1.6rem] px-[2rem] font-bold"
                     type="submit"
                     disabled={!isValid || isSubmitting}
                  >
                     <Save />
                     Save and Continue
                  </Button>
               </div>
            </form>
         </Form>
      </div>
   );
};

export default StepOne;
