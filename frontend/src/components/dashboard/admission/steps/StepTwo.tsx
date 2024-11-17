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
import { useRouter } from "next/navigation";
import { createAdmission } from "@/lib/api/admission";

const stepOneSchema = z.object({
   academicSession: z.string().min(2, {
      message: "Email must be at least 2 characters.",
   }),
   modeOfEntry: z.string().min(6, { message: " Full Name must be at least 6 characters" }),
   faculty: z.string().min(6, { message: " Address must be at least 6 characters" }),
   department: z.string().min(6, { message: " Phone Number must be at least 6 characters" }),
});

const StepTwo = () => {
   const form = useForm<z.infer<typeof stepOneSchema>>({
      resolver: zodResolver(stepOneSchema),
      defaultValues: {},
   });

   const [isError, setIsError] = useState(false);

   const router = useRouter();

   const { mutateAsync, isPending, data } = useMutation({
      mutationFn: (values: z.infer<typeof stepOneSchema>) => createAdmission(values),
      onError: (error: any) => {
         toast.error(error.message);
         setIsError(true);
      },

      onSuccess: (data) => {
         toast.success(data.message);
         console.log(data);
         sessionStorage.setItem("accesstoken", data.access);
         sessionStorage.setItem("refreshtoken", data.refresh);

         router.push(`http://localhost:3000/accounts/user/dashboard/process-admission?idx=${1}`);
      },
   });

   // Destructure isValid and isSubmitting from formState
   const { isValid, isSubmitting } = form.formState;

   async function onSubmit(values: z.infer<typeof stepOneSchema>) {
      await mutateAsync(values);
      await form.reset();
   }
   const [selectedFaculty, setSelectedFaculty] = useState("");

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

   const departmentMapping = {
      "faculty-of-arts": [
         { label: "Department of English Language", value: "department-of-english-language" },
         { label: "Department of Fine Arts", value: "department-of-fine-arts" },
         { label: "Department of Communication", value: "department-of-communication" },
         { label: "Department of History", value: "department-of-history" },
         { label: "Department of Philosophy", value: "department-of-philosophy" },
      ],
      "faculty-of-sciences": [
         { label: "Department of Mathematics", value: "department-of-mathematics" },
         { label: "Department of Physics", value: "department-of-physics" },
         { label: "Department of Chemistry", value: "department-of-chemistry" },
         { label: "Department of Biology", value: "department-of-biology" },
         { label: "Department of Geology", value: "department-of-geology" },
      ],
      "faculty-of-social-sciences": [
         { label: "Department of Economics", value: "department-of-economics" },
         { label: "Department of Political Science", value: "department-of-political-science" },
         { label: "Department of Sociology", value: "department-of-sociology" },
         { label: "Department of Psychology", value: "department-of-psychology" },
         { label: "Department of International Relations", value: "department-of-international-relations" },
      ],
      "faculty-of-education": [
         { label: "Department of Educational Psychology", value: "department-of-educational-psychology" },
         { label: "Department of Curriculum Studies", value: "department-of-curriculum-studies" },
         { label: "Department of Educational Administration", value: "department-of-educational-administration" },
         { label: "Department of Adult Education", value: "department-of-adult-education" },
         { label: "Department of Science Education", value: "department-of-science-education" },
      ],
      "faculty-of-engineering": [
         { label: "Department of Civil Engineering", value: "department-of-civil-engineering" },
         { label: "Department of Electrical Engineering", value: "department-of-electrical-engineering" },
         { label: "Department of Mechanical Engineering", value: "department-of-mechanical-engineering" },
         { label: "Department of Chemical Engineering", value: "department-of-chemical-engineering" },
         { label: "Department of Computer Engineering", value: "department-of-computer-engineering" },
      ],
      "faculty-of-law": [
         { label: "Department of Private Law", value: "department-of-private-law" },
         { label: "Department of Public Law", value: "department-of-public-law" },
         { label: "Department of International Law", value: "department-of-international-law" },
         { label: "Department of Jurisprudence", value: "department-of-jurisprudence" },
         { label: "Department of Commercial Law", value: "department-of-commercial-law" },
      ],
      "faculty-of-agriculture": [
         { label: "Department of Agricultural Economics", value: "department-of-agricultural-economics" },
         { label: "Department of Animal Science", value: "department-of-animal-science" },
         { label: "Department of Crop Science", value: "department-of-crop-science" },
         { label: "Department of Soil Science", value: "department-of-soil-science" },
         { label: "Department of Fisheries", value: "department-of-fisheries" },
      ],
      "faculty-of-environmental-sciences": [
         { label: "Department of Architecture", value: "department-of-architecture" },
         { label: "Department of Urban and Regional Planning", value: "department-of-urban-and-regional-planning" },
         { label: "Department of Estate Management", value: "department-of-estate-management" },
         { label: "Department of Surveying and Geoinformatics", value: "department-of-surveying-and-geoinformatics" },
         { label: "Department of Building", value: "department-of-building" },
      ],
      "faculty-of-business-administration": [
         { label: "Department of Business Administration", value: "department-of-business-administration" },
         { label: "Department of Accounting", value: "department-of-accounting" },
         { label: "Department of Banking and Finance", value: "department-of-banking-and-finance" },
         { label: "Department of Marketing", value: "department-of-marketing" },
         { label: "Department of Insurance", value: "department-of-insurance" },
      ],
      "faculty-of-management-sciences": [
         { label: "Department of Public Administration", value: "department-of-public-administration" },
         { label: "Department of Management", value: "department-of-management" },
         { label: "Department of Hospitality Management", value: "department-of-hospitality-management" },
         { label: "Department of Tourism Management", value: "department-of-tourism-management" },
         { label: "Department of Office Technology", value: "department-of-office-technology" },
      ],
      "faculty-of-medical-sciences": [
         { label: "Department of Medicine", value: "department-of-medicine" },
         { label: "Department of Anatomy", value: "department-of-anatomy" },
         { label: "Department of Physiology", value: "department-of-physiology" },
         { label: "Department of Nursing", value: "department-of-nursing" },
         { label: "Department of Radiology", value: "department-of-radiology" },
      ],
      "faculty-of-pharmacy": [
         { label: "Department of Pharmacology", value: "department-of-pharmacology" },
         { label: "Department of Clinical Pharmacy", value: "department-of-clinical-pharmacy" },
         { label: "Department of Pharmaceutical Chemistry", value: "department-of-pharmaceutical-chemistry" },
         { label: "Department of Pharmacognosy", value: "department-of-pharmacognosy" },
         { label: "Department of Pharmaceutics", value: "department-of-pharmaceutics" },
      ],
      "faculty-of-veterinary-medicine": [
         { label: "Department of Veterinary Anatomy", value: "department-of-veterinary-anatomy" },
         { label: "Department of Veterinary Pathology", value: "department-of-veterinary-pathology" },
         { label: "Department of Veterinary Surgery", value: "department-of-veterinary-surgery" },
         { label: "Department of Veterinary Medicine", value: "department-of-veterinary-medicine" },
         { label: "Department of Veterinary Parasitology", value: "department-of-veterinary-parasitology" },
      ],
      "faculty-of-dentistry": [
         { label: "Department of Oral Surgery", value: "department-of-oral-surgery" },
         { label: "Department of Orthodontics", value: "department-of-orthodontics" },
         { label: "Department of Prosthodontics", value: "department-of-prosthodontics" },
         { label: "Department of Periodontics", value: "department-of-periodontics" },
         { label: "Department of Oral Medicine", value: "department-of-oral-medicine" },
      ],
      "faculty-of-health-sciences": [
         { label: "Department of Public Health", value: "department-of-public-health" },
         { label: "Department of Community Medicine", value: "department-of-community-medicine" },
         { label: "Department of Health Information Management", value: "department-of-health-information-management" },
         { label: "Department of Medical Laboratory Science", value: "department-of-medical-laboratory-science" },
         { label: "Department of Optometry", value: "department-of-optometry" },
      ],
      "faculty-of-computer-science": [
         { label: "Department of Computer Science", value: "department-of-computer-science" },
         { label: "Department of Information Technology", value: "department-of-information-technology" },
         { label: "Department of Software Engineering", value: "department-of-software-engineering" },
         { label: "Department of Cybersecurity", value: "department-of-cybersecurity" },
         { label: "Department of Data Science", value: "department-of-data-science" },
      ],
      "faculty-of-humanities": [
         {
            label: "Department of History and International Studies",
            value: "department-of-history-and-international-studies",
         },
         { label: "Department of Linguistics", value: "department-of-linguistics" },
         { label: "Department of Religion and Philosophy", value: "department-of-religion-and-philosophy" },
         { label: "Department of Theatre Arts", value: "department-of-theatre-arts" },
         { label: "Department of Literary Studies", value: "department-of-literary-studies" },
      ],
      "faculty-of-fine-arts": [
         { label: "Department of Sculpture", value: "department-of-sculpture" },
         { label: "Department of Painting", value: "department-of-painting" },
         { label: "Department of Graphics", value: "department-of-graphics" },
         { label: "Department of Textile Design", value: "department-of-textile-design" },
         { label: "Department of Art History", value: "department-of-art-history" },
      ],
      "faculty-of-theology": [
         { label: "Department of Biblical Studies", value: "department-of-biblical-studies" },
         { label: "Department of Systematic Theology", value: "department-of-systematic-theology" },
         { label: "Department of Church History", value: "department-of-church-history" },
         { label: "Department of Practical Theology", value: "department-of-practical-theology" },
         { label: "Department of Ethics", value: "department-of-ethics" },
      ],
   };

   // Filter departments based on the selected faculty
   const filteredDepartments = selectedFaculty ? departmentMapping[selectedFaculty] || [] : [];

   return (
      <div className="p-[2rem] bg-white rounded-[20px] mt-[1rem]">
         <h1 className="text-[1.3rem] font-bold mb-[.3rem]">Your Academic Information</h1>
         <p className="text-[1rem] text-[#000]/40">
            Now, let’s talk about your academic background and the program you're applying for
         </p>

         <div>
            <Form {...form}>
               <form
                  action=""
                  className="space-y-2"
                  onSubmit={form.handleSubmit(onSubmit)}
               >
                  <TextField
                     placeholder="2024/2025"
                     label="Academic Session"
                     form={form}
                     name="academicSession"
                     classname="border-[1px!important] bg-[#dadada3d]"
                  />
                  <div>
                     <SelectField
                        items={[
                           {
                              value: "UTME",
                              label: "UTME",
                           },
                           {
                              label: "Direct Entry",
                              value: "Direct Entry",
                           },
                           {
                              label: "Transfer",
                              value: "Transfer",
                           },
                        ]}
                        name="modeOfEntry"
                        label="Mode of Entry"
                        placeholder="Choose Mode of Entry"
                        form={form}
                        classname="border-[1px!important] bg-[#dadada3d]"
                     />
                  </div>

                  <SelectField
                     items={faculties}
                     name="faculty"
                     label="Faculty"
                     placeholder="Select Faculty"
                     form={form}
                     classname="border-[1px!important] bg-[#dadada3d]"
                     onValueChange={(value) => console.log(value)}
                  />
                  <SelectField
                     items={filteredDepartments}
                     name="department"
                     label="Department"
                     placeholder="Select Department"
                     form={form}
                     classname="border-[1px!important] bg-[#dadada3d]"
                  />

                  <Button
                     className="bg-[#02333F] py-[1.6rem] px-[2rem] font-bold"
                     type="submit"
                     // Disable the button if form is invalid or submitting
                  >
                     Save and Continue
                  </Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default StepTwo;
