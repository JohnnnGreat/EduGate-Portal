"use client";

import SelectField from "@/components/form/SelectField";
import TextField from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { updateAdmission } from "@/lib/api/admission";
import useGetAdmission from "@/hooks/useGetAdmission";

// Define the form schema using zod
const stepOneSchema = z.object({
   academicSession: z.string().min(2, "Session must be at least 2 characters."),
   modeOfEntry: z.enum(["UTME", "Transfer", "Direct Entry"], "Mode of Entry must be selected."),
   faculty: z.enum(
      [
         "faculty-of-arts",
         "faculty-of-sciences",
         "faculty-of-social-sciences",
         "faculty-of-education",
         "faculty-of-engineering",
         "faculty-of-law",
         "faculty-of-agriculture",
         "faculty-of-environmental-sciences",
         "faculty-of-business-administration",
         "faculty-of-management-sciences",
         "faculty-of-medical-sciences",
         "faculty-of-pharmacy",
         "faculty-of-veterinary-medicine",
         "faculty-of-dentistry",
         "faculty-of-health-sciences",
         "faculty-of-computer-science",
         "faculty-of-humanities",
         "faculty-of-fine-arts",
         "faculty-of-communication",
         "faculty-of-architecture",
      ],
      "Please select a valid faculty.",
   ),
   department: z.string().min(6, "Department name must be at least 6 characters."),
});

const StepTwo = () => {
   // Initialize form with React Hook Form and Zod validation
   const form = useForm<z.infer<typeof stepOneSchema>>({
      resolver: zodResolver(stepOneSchema),
      defaultValues: { academicSession: "2024/2025" },
   });

   const [isError, setIsError] = useState(false);
   const router = useRouter();
   const stepLevel = useSearchParams().get("idx");
   const applicationLevel = JSON.parse(localStorage.getItem("applicationLevel") || "0");

   // Mutation hook to handle admission updates
   const { mutateAsync, isPending } = useMutation({
      mutationFn: (values: z.infer<typeof stepOneSchema>) => updateAdmission(values),
      onError: (error: any) => {
         toast.error(error.message);
         setIsError(true);
      },
      onSuccess: (data) => {
         toast.success(data.message);
         router.push(`/accounts/user/dashboard/process-admission?idx=${1}`);
         const currentLevel = Number(applicationLevel) + 1;
         localStorage.setItem("applicationLevel", currentLevel.toString());
      },
   });

   // Destructure isValid and isSubmitting from formState
   const { isValid, isSubmitting } = form.formState;

   // Handle form submission
   const onSubmit = async (values: z.infer<typeof stepOneSchema>) => {
      await mutateAsync(values);
      form.reset();
   };

   // Define faculties and departments
   const faculties = [
      { label: "Faculty of Arts", value: "faculty-of-arts" },
      { label: "Faculty of Sciences", value: "faculty-of-sciences" },
      { label: "Faculty of Social Sciences", value: "faculty-of-social-sciences" },
      { label: "Faculty of Education", value: "faculty-of-education" },
      { label: "Faculty of Engineering", value: "faculty-of-engineering" },
      { label: "Faculty of Law", value: "faculty-of-law" },
      { label: "Faculty of Agriculture", value: "faculty-of-agriculture" },
      { label: "Faculty of Environmental Sciences", value: "faculty-of-environmental-sciences" },
      { label: "Faculty of Business Administration", value: "faculty-of-business-administration" },
      { label: "Faculty of Management Sciences", value: "faculty-of-management-sciences" },
      { label: "Faculty of Medical Sciences", value: "faculty-of-medical-sciences" },
      { label: "Faculty of Pharmacy", value: "faculty-of-pharmacy" },
      { label: "Faculty of Veterinary Medicine", value: "faculty-of-veterinary-medicine" },
      { label: "Faculty of Dentistry", value: "faculty-of-dentistry" },
      { label: "Faculty of Health Sciences", value: "faculty-of-health-sciences" },
      { label: "Faculty of Computer Science", value: "faculty-of-computer-science" },
      { label: "Faculty of Humanities", value: "faculty-of-humanities" },
      { label: "Faculty of Fine Arts", value: "faculty-of-fine-arts" },
      { label: "Faculty of Communication", value: "faculty-of-communication" },
      { label: "Faculty of Architecture", value: "faculty-of-architecture" },
   ];

   // Department mapping by faculty
   const departmentMapping: Record<string, { label: string; value: string }[]> = {
      "faculty-of-arts": [
         { label: "Department of English Language", value: "department-of-english-language" },
         { label: "Department of Fine Arts", value: "department-of-fine-arts" },
         { label: "Department of Communication", value: "department-of-communication" },
         { label: "Department of History", value: "department-of-history" },
         { label: "Department of Philosophy", value: "department-of-philosophy" },
      ],
      // Add other faculties and departments as needed...
   };

   return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
         {/* Academic Session Field */}
         <TextField
            label="Academic Session"
            {...form.register("academicSession")}
         />

         {/* Mode of Entry Select */}
         <SelectField
            label="Mode of Entry"
            options={[
               { label: "UTME", value: "UTME" },
               { label: "Transfer", value: "Transfer" },
               { label: "Direct Entry", value: "Direct Entry" },
            ]}
            {...form.register("modeOfEntry")}
         />

         {/* Faculty Select */}
         <SelectField
            label="Faculty"
            options={faculties}
            {...form.register("faculty")}
            onChange={(e) => {
               // Update available departments based on faculty selection
               const selectedFaculty = e.target.value;
               const departments = departmentMapping[selectedFaculty] || [];
               // You can dynamically update the department options here
            }}
         />

         {/* Department Select */}
         <SelectField
            label="Department"
            options={departmentMapping[form.watch("faculty")] || []}
            {...form.register("department")}
         />

         {/* Submit Button */}
         <Button
            type="submit"
            disabled={!isValid || isSubmitting}
         >
            Submit
         </Button>
      </Form>
   );
};

export default StepTwo;
