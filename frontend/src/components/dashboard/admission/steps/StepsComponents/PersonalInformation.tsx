import { Button } from "@/components/ui/button";
import useGetStepLevel from "@/hooks/useGetStepLevel";
import { getDeparmentLabel, getFacultyLabel } from "@/lib/utils";
import { AdmissionInformation, ProfileInformation, User } from "@/types";
import { Save } from "lucide-react";
import React, { useState } from "react";

const PersonalInformation = ({
   profileInformation,
   admissionInformation,
   handlePrevious,
   handleSubmitApplication,
}: {
   profileInformation: ProfileInformation;
   admissionInformation: AdmissionInformation;
   handlePrevious: Function;
   handleSubmitApplication: Function;
}) => {
   // State to manage checkbox
   const [isInformationCorrect, setIsInformationCorrect] = useState(false);

   // Handle checkbox change
   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsInformationCorrect(e.target.checked);
   };

   const { stepLevel } = useGetStepLevel();

   return (
      <div>
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
               <span className="text-sm">I confirm that the information provided is correct.</span>
            </label>
         </div>

         {/* Button Section */}
         <div className="flex gap-3 mt-6">
            {stepLevel !== "0" && (
               <Button
                  className="text-[#02333F] bg-transparent hover:bg-[#02333f31] border border-[#02333F] py-[1.6rem] px-[2rem] font-bold"
                  type="button"
                  onClick={() => {
                     handlePrevious();
                  }}
               >
                  Previous
               </Button>
            )}
            <Button
               className="bg-[#02333F] py-[1.6rem] px-[2rem] font-bold"
               type="submit"
               disabled={!isInformationCorrect} // Disable button if checkbox is not checked
               onClick={() => {
                  handleSubmitApplication();
               }}
            >
               <Save />
               Submit Application
            </Button>
         </div>
      </div>
   );
};

export default PersonalInformation;
