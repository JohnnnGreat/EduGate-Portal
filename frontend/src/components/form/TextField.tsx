"use client";
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const TextField = ({ form, label, placeholder, classname, name }: { className?: string }) => {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input
                     placeholder={placeholder}
                     {...field}
                     className={`bg-white py-[1.6rem] shadow-none px-[1rem] outline-none  ${classname}`}
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   );
};

export default TextField;
