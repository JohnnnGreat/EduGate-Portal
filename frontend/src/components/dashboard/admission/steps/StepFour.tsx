import React, { useRef, useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import useGetAdmission from "@/hooks/useGetAdmission";
import useUserData from "@/hooks/useUserData";
import { departmentMapping, faculties } from "./StepTwo";
import { updateAdmission } from "@/lib/api/admission";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";

const StepFour = () => {
   const { data: response } = useUserData();
   const profileInformation = response?.data;

   const { data: admissionInformation, isLoading, error } = useGetAdmission();

   const getFacultyLabel = (facultyName: string) => {
      const fa = faculties.filter((item) => {
         return item?.value?.includes(facultyName);
      });

      return fa[0]?.label;
   };

   const getDeparmentLabel = (facultyName: string, departmentName: string) => {
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

   const stepLevel = useSearchParams().get("idx");

   // State to manage checkbox
   const [isInformationCorrect, setIsInformationCorrect] = useState(false);

   // Handle checkbox change
   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsInformationCorrect(e.target.checked);
   };

   const router = useRouter();

   const handlePrevious = () => {
      router.push(
         `http://localhost:3000/accounts/user/dashboard/process-admission?idx=${
            Number(stepLevel) - 1
         }`,
      );
   };

   const { mutateAsync, isPending } = useMutation({
      mutationFn: (values: { submitted: Boolean }) => updateAdmission(values),
      onError: (error: any) => {
         toast.error(error.message);
      },
      onSuccess: (data) => {
         console.log(data);
         toast.success(data.message);
         router.push(`/accounts/user/dashboard/process-admission?idx=${4}`);
         //  const currentLevel = Number(applicationLevel) + 1;
         //  localStorage.setItem("applicationLevel", currentLevel.toString());
      },
   });

   const handleSubmitApplication = () => {
      mutateAsync({ submitted: true });
   };

   const document = useRef(null);

   return (
      <div className="p-[2rem] bg-white rounded-[20px] mt-[1rem]">
         <h1 className="text-[1.3rem] font-bold mb-[.3rem]">Review Your Application</h1>
         <p className="text-[1rem] text-[#000]/40">
            Take a moment to review everything you’ve entered. If all looks good, submit your
            application!
         </p>
         <div ref={document}>
            <h1 className="text-[1.3rem] mt-[1rem] font-bold">Personal Information</h1>
            <div className="grid grid-cols-2 gap-[1rem]">
               <div>
                  <h1 className="text-gray-500">Full Name</h1>
                  <h1 className="font-bold">{`${profileInformation?.firstName}, ${profileInformation?.lastName}`}</h1>
               </div>
               <div>
                  <h1 className="text-gray-500">Email</h1>
                  <h1 className="font-bold">{profileInformation?.email}</h1>
               </div>
               <div>
                  <h1 className="text-gray-500">Date of Birth</h1>
                  <h1 className="font-bold">
                     {new Date(profileInformation?.dateOfBirth)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "/")}
                  </h1>
               </div>
               <div>
                  <h1 className="text-gray-500">Admission No</h1>
                  <h1 className="font-bold">{profileInformation?.admissionNumber}</h1>
               </div>
               <div>
                  <h1 className="text-gray-500">Gender</h1>
                  <h1 className="font-bold">{profileInformation?.gender}</h1>
               </div>
               <div>
                  <h1 className="text-gray-500">Admitted</h1>
                  <h1 className="font-bold text-red-500">{admissionInformation?.data?.status}</h1>
               </div>
            </div>

            {/* Program Information Section */}
            <h1 className="text-[1.3rem] font-bold mt-[2rem]">Program Information</h1>
            <hr />
            <div className="grid grid-cols-2 gap-[1rem] mt-[1rem]">
               <div>
                  <h1 className="text-gray-500">Faculty</h1>
                  <h1 className="font-bold">
                     {getFacultyLabel(admissionInformation?.data?.program.faculty)}
                  </h1>
               </div>
               <div>
                  <h1 className="text-gray-500">Department</h1>
                  <h1 className="font-bold">
                     {getDeparmentLabel(
                        admissionInformation?.data?.program?.faculty,
                        admissionInformation?.data?.program?.department,
                     )}
                  </h1>
               </div>
               <div>
                  <h1 className="text-gray-500">Mode of Entry</h1>
                  <h1 className="font-bold">{admissionInformation?.data?.program?.modeOfEntry}</h1>
               </div>
            </div>

            {/* Checkbox for confirmation */}
            <div className="mt-4">
               <label className="flex items-center">
                  <input
                     type="checkbox"
                     checked={isInformationCorrect}
                     onChange={handleCheckboxChange}
                     className="mr-2"
                  />
                  <span className="text-sm">
                     I confirm that the information provided is correct.
                  </span>
               </label>
            </div>

            {/* Button Section */}
            <div className="flex gap-3 mt-6">
               {stepLevel !== "0" && (
                  <Button
                     className="text-[#02333F] bg-transparent hover:bg-[#02333f31] border border-[#02333F] py-[1.6rem] px-[2rem] font-bold"
                     type="button"
                     onClick={handlePrevious}
                  >
                     Previous
                  </Button>
               )}
               <Button
                  className="bg-[#02333F] py-[1.6rem] px-[2rem] font-bold"
                  type="submit"
                  disabled={!isInformationCorrect} // Disable button if checkbox is not checked
                  onClick={handleSubmitApplication}
               >
                  <Save />
                  Submit Application
               </Button>
            </div>
         </div>
         {/* Personal Information Section */}
      </div>
   );
};

export default StepFour;
