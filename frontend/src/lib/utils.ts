import { departmentMapping, faculties } from "@/components/dashboard/admission/steps/StepTwo";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const getFacultyLabel = (facultyName: string) => {
   const fa = faculties.filter((item) => {
      return item?.value?.includes(facultyName);
   });

   return fa[0]?.label;
};

export const getDeparmentLabel = (facultyName: string, departmentName: string) => {
   // Check if the facultyName exists in departmentMapping
   const department = departmentMapping[facultyName]?.filter((item) =>
      item?.value?.includes(departmentName),
   );

   // If department is not found or is empty, return undefined
   if (!department || department.length === 0) {
      return undefined;
   }

   // Return the label of the first department that matches
   return department[0]?.label;
};
