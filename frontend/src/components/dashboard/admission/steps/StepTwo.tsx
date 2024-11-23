"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { updateAdmission } from "@/lib/api/admission";
import useGetAdmission from "@/hooks/useGetAdmission";
import SelectField from "@/components/form/SelectField";
import TextField from "@/components/form/TextField";
import { departmentMapping, faculties } from "../../constants";

const stepOneSchema = z.object({
   academicSession: z
      .string()
      .min(2, { message: "Academic session must be at least 2 characters." }),
   modeOfEntry: z.enum(["UTME", "Transfer", "Direct Entry"], {
      message: "Mode of Entry must be selected.",
   }),
   faculty: z.enum(
      faculties.map((faculty) => faculty.value),
      { message: "Please select a valid faculty." },
   ),
   department: z.string().min(6, { message: "Department must be at least 6 characters." }),
});

const StepTwo = () => {
   const form = useForm<z.infer<typeof stepOneSchema>>({
      resolver: zodResolver(stepOneSchema),
      defaultValues: { academicSession: "2024/2025" },
   });

   const [isError, setIsError] = useState(false);
   const router = useRouter();
   const stepLevel = useSearchParams().get("idx");
   const applicationLevel = JSON.parse(localStorage.getItem("applicationLevel") ?? "0");

   const { mutateAsync, isPending } = useMutation({
      mutationFn: (values: z.infer<typeof stepOneSchema>) => updateAdmission(values),
      onError: (error: any) => {
         toast.error(error.message);
         setIsError(true);
      },
      onSuccess: (data) => {
         toast.success(data.message);
         router.push(`/accounts/user/dashboard/process-admission?idx=2`);
         localStorage.setItem("applicationLevel", String(Number(applicationLevel) + 1));
      },
   });

   const { isValid, isSubmitting } = form.formState;

   const [selectedFaculty, setSelectedFaculty] = useState<string>("");
   const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);

   const handleFacultyChange = (faculty: string) => {
      setSelectedFaculty(faculty);
      setDepartments(departmentMapping[faculty] || []);
   };

   const handlePrevious = () => {
      router.push(`/accounts/user/dashboard/process-admission?idx=${Number(stepLevel) - 1}`);
   };

   const { data: response } = useGetAdmission();

   useEffect(() => {
      if (response) {
         form.reset({
            faculty: response?.data.program.faculty || "",
            department: response?.data.program.department || "",
            modeOfEntry: response?.data.program.modeOfEntry || "",
         });
         handleFacultyChange(response?.data.program.faculty || "");
      }
   }, [response, form]);

   const onSubmit = async (values: z.infer<typeof stepOneSchema>) => {
      await mutateAsync(values);
      form.reset();
   };

   return (
      <div className="p-8 bg-white rounded-2xl mt-4">
         <h1 className="text-xl font-bold mb-2">Your Academic Information</h1>
         <p className="text-base text-gray-500">
            Let’s talk about your academic background and the program you're applying for.
         </p>

         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-4"
            >
               <TextField
                  label="Academic Session"
                  name="academicSession"
                  form={form}
                  defaultValue="2024/2025"
                  disabled={true}
                  className="border bg-gray-300"
               />

               <SelectField
                  name="modeOfEntry"
                  label="Mode of Entry"
                  form={form}
                  items={[
                     { value: "UTME", label: "UTME" },
                     { value: "Direct Entry", label: "Direct Entry" },
                     { value: "Transfer", label: "Transfer" },
                  ]}
                  placeholder="Choose Mode of Entry"
                  className="border bg-gray-300"
               />

               <SelectField
                  name="faculty"
                  label="Faculty"
                  form={form}
                  items={faculties}
                  placeholder="Select Faculty"
                  onValueChange={handleFacultyChange}
                  className="border bg-gray-300"
               />

               {selectedFaculty && (
                  <SelectField
                     name="department"
                     label="Department"
                     form={form}
                     items={departments}
                     placeholder="Select Department"
                  />
               )}

               <div className="flex gap-4">
                  {stepLevel !== "0" && (
                     <Button
                        type="button"
                        onClick={handlePrevious}
                        className="text-[#02333F] bg-transparent hover:bg-[#02333f31] border py-4 px-8 font-bold"
                     >
                        Previous
                     </Button>
                  )}
                  <Button
                     type="submit"
                     disabled={!isValid || isSubmitting}
                     className="bg-[#02333F] py-4 px-8 font-bold"
                  >
                     Save and Continue
                  </Button>
               </div>
            </form>
         </Form>
      </div>
   );
};

export default StepTwo;
