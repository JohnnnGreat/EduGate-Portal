"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { checkUserAdmission } from "@/lib/api/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAdminEmail } from "@/lib/api/admin";

const userSchema = z.object({
   email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
   }),
});

const LoginAdmin = () => {
   const router = useRouter();
   const [isError, setIsError] = useState(false);
   const [email, setEmail] = useState("");

   const { mutateAsync, isPending } = useMutation({
      mutationFn: (values: z.infer<typeof userSchema>) => loginAdminEmail(values),
      onError: (error) => {
         toast.error(error.message);
         setIsError(true);
      },
      onSuccess: (data) => {
         setIsError(false);
         router.push(`/accounts/ict/auth/login/password?email=${email}`);
      },
   });

   const form = useForm<z.infer<typeof userSchema>>({
      resolver: zodResolver(userSchema),
      defaultValues: { email: "" },
   });

   const onSubmit = async (values: z.infer<typeof userSchema>) => {
      setEmail(values.email);
      await mutateAsync(values);
   };

   return (
      <div className="flex items-center justify-center h-screen">
         <div className="w-full md:w-[500px]">
            <h1 className="font-bold text-[#000]/80 text-[25px]">Welcome</h1>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="bg-[#F8F8F8] p-[2rem] mt-[1.2rem] rounded-[20px] space-y-2"
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
                        "Check Status"
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

export default LoginAdmin;
