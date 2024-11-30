"use client";
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

interface TextFieldProps {
   form: UseFormReturn<any>; // You can replace `any` with a specific type if you have one
   label: string;
   placeholder?: string;
   classname?: string;
   name: string;
   defaultValue?: string;
   disabledField?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
   form,
   label,
   placeholder,
   classname,
   name,
   defaultValue,
   disabledField,
}) => {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel className=" mt-3">{label}</FormLabel>
               <FormControl>
                  <Input
                     placeholder={placeholder}
                     disabled={disabledField}
                     {...field}
                     value={defaultValue ?? field.value} // Use `defaultValue` or fall back to `field.value`
                     className={`bg-white py-[1.6rem] mt-[0!important] shadow-none px-[1rem] outline-none ${classname}`}
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   );
};

export default TextField;
