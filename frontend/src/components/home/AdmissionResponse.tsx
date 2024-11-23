"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const AdmissionResponse = () => {
   const status = useSearchParams().get("status");
   const emailAddress = useSearchParams().get("email");

   if (status === "Not Admitted")
      return (
         <div className="w-full h-screen flex items-center justify-center">
            <div className="bg-white rounded-[20px] p-[2rem] w-[700px]">
               <h1>Admission Status: Not Yet Admitted</h1>
            </div>
         </div>
      );
};

export default AdmissionResponse;
