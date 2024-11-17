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
import { checkUserAdmission, loginUserDashboard } from "@/lib/api/user";
import { useRouter } from "next/navigation";

const userSchema = z.object({
   email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
   }),
   password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LoginComponent = () => {
   const [isError, setIsError] = useState(false);

   const router = useRouter();

   const { mutateAsync, isPending, data } = useMutation({
      mutationFn: (values: z.infer<typeof userSchema>) => loginUserDashboard(values),
      onError: (error: any) => {
         toast.error(error.message);
         setIsError(true);
      },

      onSuccess: (data) => {
         toast.success(data.message);
         console.log(data);
         sessionStorage.setItem("accesstoken", data.access);
         sessionStorage.setItem("refreshtoken", data.refresh);

         router.push("/accounts/user/dashboard");
      },
   });

   const form = useForm<z.infer<typeof userSchema>>({
      resolver: zodResolver(userSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   async function onSubmit(values: z.infer<typeof userSchema>) {
      await mutateAsync(values);
      await form.reset();
   }
   return (
      <div className="flex items-center justify-center h-screen">
         <div className="w-full md:w-[500px]">
            <h1 className="font-bold text-[#000]/80 text-[25px]">Login</h1>
            <p className="leading-relaxed text-[#000]/45">Login to your dashboard</p>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="bg-[#F8F8F8] p-[2rem] mt-[1.2rem] rounded-[20px] space-y-2 "
               >
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
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
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 placeholder="Enter Your Password"
                                 {...field}
                                 autoComplete="off"
                                 className="bg-white py-[1.6rem] shadow-none px-[1rem] outline-none border-none"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <p className="my-[.8rem] text-[.8rem] text-right">Forgotten Password?</p>
                  <Button
                     className="w-full bg-[#02333F] py-[1.6rem] font-bold"
                     type="submit"
                  >
                     Login
                  </Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default LoginComponent;
