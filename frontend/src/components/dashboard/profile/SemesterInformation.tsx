import React from "react";

interface SemesterInformationProps {
   semesterInformation: {
      semesterInformationUpdated: boolean;
   };
}

const SemesterInformation: React.FC<SemesterInformationProps> = ({ semesterInformation }) => {
   const updated = semesterInformation?.semesterInformationUpdated;

   return (
      <div className="w-[400px] p-[2rem] rounded-[20px] bg-[#02333F] mt-[1rem]">
         {updated ? (
            <p>Semester information has been updated.</p>
         ) : (
            <div>
               <h1 className="text-white text-[1.3rem] font-bold">
                  Semester Information Pending Updates
               </h1>
               <p className="text-[#fff]/60 leading-relaxed">
                  Your semester information is pending updates and will be reflected once updated by
                  the MIS.
               </p>
            </div>
         )}
      </div>
   );
};

export default SemesterInformation;
