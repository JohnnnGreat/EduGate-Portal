import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const SelectField = ({ form, items, placeholder, label, name, classname, onValueChange }: { item: any[] }) => {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <Select
                  onValueChange={onValueChange}
                  defaultValue={field.value}
                  value={field.value}
               >
                  <FormControl>
                     <SelectTrigger className={`bg-white py-[1.6rem] shadow-none px-[1rem] outline-none  ${classname}`}>
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
