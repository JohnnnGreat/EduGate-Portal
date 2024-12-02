"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { checkUserAdmission } from "@/lib/api/user";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAdmin, loginAdminEmail } from "@/lib/api/admin";

const userSchema = z.object({
   password: z.string().min(2, {
      message: "Password is Required",
   }),
});

const LoginPassword = () => {
   const router = useRouter();

   const adminEmail = useSearchParams().get("email");

   const [isError, setIsError] = useState(false);

   const [email, setEmail] = useState("");

   const { mutateAsync, isPending, data } = useMutation({
      mutationFn: (values: { email: string | null; password: string | null }) => loginAdmin(values),

      onError: (error) => {
         toast.error(error.message);
         setIsError(true);
      },

      onSuccess: (data) => {
         console.log(data);
         toast.success(data.message);
         localStorage.setItem("adminAccess", data.access);
         localStorage.setItem("adminRefresh", data.refresh);
      },
   });

   const form = useForm<z.infer<typeof userSchema>>({
      resolver: zodResolver(userSchema),

      defaultValues: {
         password: "",
      },
   });

   async function onSubmit(values: z.infer<typeof userSchema>) {
      const requestBody = {
         email: adminEmail,
         password: values.password,
      };

      console.log(requestBody);
      await mutateAsync(requestBody);
   }

   function onError(err) {
      console.log(err);
   }

   return (
      <div className="flex items-center justify-center h-screen">
         <div className="w-full md:w-[500px]">
            <h1 className="font-bold text-[#000]/80 text-[25px]">
               Welcome, <span className="font-normal">{adminEmail}</span>
            </h1>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit, onError)}
                  className="bg-[#F8F8F8] p-[2rem] mt-[1.2rem] rounded-[20px] space-y-2 "
               >
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 placeholder="Please enter your password"
                                 {...field}
                                 type="password"
                                 className="bg-white py-[1.6rem] shadow-none px-[1rem] outline-none border-none"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button
                     className="w-full bg-[#02333F] py-[1.6rem] font-bold"
                     type="submit"
                     disabled={isPending}
                  >
                     {isPending ? (
                        <>
                           Continue
                           <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        </>
                     ) : (
                        "Login"
                     )}
                  </Button>

                  {isError && (
                     <Link
                        href="/admission/register"
                        className="text-red-500 text-[.8rem] underline"
                     >
                        We could not find an account associated with the provided email and
                        admission ID
                     </Link>
                  )}
               </form>
            </Form>
         </div>
      </div>
   );
};

export default LoginPassword;
