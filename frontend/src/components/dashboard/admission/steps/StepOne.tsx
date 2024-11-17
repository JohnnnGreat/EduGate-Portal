"use client";
import SelectField from "@/components/form/SelectField";
import TextField from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createAdmission } from "@/lib/api/admission";

const stepOneSchema = z.object({
   email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
   }),
   fullName: z.string().min(6, { message: " Full Name must be at least 6 characters" }),
   address: z.string().min(6, { message: " Address must be at least 6 characters" }),
   gender: z.string(),
   phoneNumber: z.string().min(6, { message: " Phone Number must be at least 6 characters" }),
});

const StepOne = () => {
   const form = useForm<z.infer<typeof stepOneSchema>>({
      resolver: zodResolver(stepOneSchema),
      defaultValues: {},
   });

   const [isError, setIsError] = useState(false);

   const router = useRouter();

   const { mutateAsync, isPending, data } = useMutation({
      mutationFn: (values: z.infer<typeof stepOneSchema>) => createAdmission(values),
      onError: (error: any) => {
         toast.error(error.message);
         setIsError(true);
      },

      onSuccess: (data) => {
         toast.success(data.message);
         console.log(data);
         sessionStorage.setItem("accesstoken", data.access);
         sessionStorage.setItem("refreshtoken", data.refresh);

         router.push(`http://localhost:3000/accounts/user/dashboard/process-admission?idx=${1}`);
      },
   });

   // Destructure isValid and isSubmitting from formState
   const { isValid, isSubmitting } = form.formState;

   async function onSubmit(values: z.infer<typeof stepOneSchema>) {
      await mutateAsync(values);
      await form.reset();
   }

   return (
      <div className="p-[2rem] bg-white rounded-[20px] mt-[1rem]">
         <h1 className="text-[1.3rem] font-bold mb-[.3rem]">Your Personal Information</h1>
         <p className="text-[1rem] text-[#000]/40">Let’s start by getting to know you better</p>

         <div>
            <Form {...form}>
               <form
                  action=""
                  className="space-y-2"
                  onSubmit={form.handleSubmit(onSubmit)}
               >
                  <TextField
                     placeholder="name@email.com"
                     label="Email Address"
                     form={form}
                     name="email"
                     classname="border-[1px!important] bg-[#dadada3d]"
                  />
                  <div>
                     <SelectField
                        items={[
                           {
                              label: "Male",
                              value: "Male",
                           },
                           {
                              label: "Female",
                              value: "Female",
                           },
                        ]}
                        name="gender"
                        placeholder="Choose Gender"
                        label="Gender"
                        form={form}
                        classname="border-[1px!important] bg-[#dadada3d]"
                     />
                  </div>

                  <TextField
                     placeholder="John Doe"
                     label="Full Name"
                     form={form}
                     name="fullName"
                     classname="border-[1px!important] bg-[#dadada3d]"
                  />
                  <TextField
                     placeholder="9038457675"
                     label="Phone Number"
                     form={form}
                     name="phoneNumber"
                     classname="border-[1px!important] bg-[#dadada3d]"
                  />
                  <TextField
                     placeholder="Your Address"
                     label="Address"
                     form={form}
                     name="address"
                     classname="border-[1px!important] bg-[#dadada3d]"
                  />

                  <Button
                     className="bg-[#02333F] py-[1.6rem] px-[2rem] font-bold"
                     type="submit"
                     disabled={!isValid || isSubmitting} // Disable the button if form is invalid or submitting
                  >
                     Save and Continue
                  </Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default StepOne;
