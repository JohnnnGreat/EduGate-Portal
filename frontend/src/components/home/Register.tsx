"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { checkUserAdmission } from "@/lib/api/user";
import Link from "next/link";

const formSchema = z.object({
   firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
   }),
   lastName: z.string().min(2, {
      message: "Last Name must be at least 2 characters.",
   }),
});
const Register = () => {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {},
   });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
   }
   return (
      <>
         <div>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="bg-[#F8F8F8] p-[2rem] mt-[1.2rem] rounded-[20px] space-y-2 "
               >
                  <div className="grid grid-cols-2">
                     <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Enter Your First Name"
                                    {...field}
                                    className="bg-white py-[1.6rem] shadow-none px-[1rem] outline-none border-none"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Enter Your Email Address"
                                    {...field}
                                    className="bg-white py-[1.6rem] shadow-none px-[1rem] outline-none border-none"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="grid grid-cols-2">
                     <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Enter Your First Name"
                                    {...field}
                                    className="bg-white py-[1.6rem] shadow-none px-[1rem] outline-none border-none"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Enter Your Email Address"
                                    {...field}
                                    className="bg-white py-[1.6rem] shadow-none px-[1rem] outline-none border-none"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <Button
                     className="w-full bg-[#02333F] py-[1.6rem] font-bold"
                     type="submit"
                     disabled={isPending}
                  >
                     {isPending ? (
                        <>
                           Checking Status
                           <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        </>
                     ) : (
                        "Check Status"
                     )}
                  </Button>

                  {/* {isError && (
                     <Link
                        href="/admission/register"
                        className="text-red-500 text-[.8rem] underline"
                     >
                        We could not find an account associated with the provided email and admission ID
                     </Link>
                  )} */}
               </form>
            </Form>
         </div>
      </>
   );
};

export default Register;
