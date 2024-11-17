"use client";
import TextField from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const stepOneSchema = z.object({
   email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
   }),
   fullName: z.string().min(6, { message: " Full Name must be at least 6 characters" }),
   address: z.string().min(6, { message: " Address must be at least 6 characters" }),
});

const StepOne = () => {
   const form = useForm<z.infer<typeof stepOneSchema>>({
      resolver: zodResolver(stepOneSchema),
      defaultValues: {},
   });

   // Destructure isValid and isSubmitting from formState
   const { isValid, isSubmitting } = form.formState;

   async function onSubmit(values: z.infer<typeof stepOneSchema>) {
      console.log(values);
   }

   return (
      <div className="p-[2rem] bg-white rounded-[20px] mt-[1rem]">
         <h1 className="text-[1.3rem] font-bold mb-[.3rem]">Your Personal Information</h1>
         <p className="text-[.8rem] text-[#000]/40">Let’s start by getting to know you better</p>

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
                  <TextField
                     placeholder="John Doe"
                     label="Full Name"
                     form={form}
                     name="fullName"
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
