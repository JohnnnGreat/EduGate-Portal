import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SelectField = ({ item }: { item: any[] }) => {
   return (
      <Select>
         <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
         </SelectTrigger>
         <SelectContent>
            {item.map((item) => (
               <SelectItem value={item.value}>{item.label}</SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
};

export default SelectField;
