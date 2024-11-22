import React from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";

interface SelectFieldProps {
   form: any; // Define your form type, e.g., React Hook Form's `useForm` return type
   items: { label: string; value: string }[]; // Array of items, each with a label and value
   placeholder: string;
   label: string;
   name: string;
   classname?: string; // Optional classname
   onValueChange?: (value: string) => void; // Optional callback on value change
}

const SelectField = ({
   form,
   items,
   placeholder,
   label,
   name,
   classname,
   onValueChange,
}: SelectFieldProps) => {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <Select
                  onValueChange={(value) => {
                     field.onChange(value);
                     onValueChange?.(value);
                  }}
                  value={field.value}
               >
                  <FormControl>
                     <SelectTrigger
                        className={`bg-white py-[1.6rem] shadow-none px-[1rem] outline-none ${classname}`}
                     >
                        <SelectValue placeholder={placeholder} />
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                     {items.map((item, idx) => (
                        <SelectItem
                           key={idx}
                           value={item.value}
                        >
                           {item.label}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
               <FormMessage />
            </FormItem>
         )}
      />
   );
};

export default SelectField;
