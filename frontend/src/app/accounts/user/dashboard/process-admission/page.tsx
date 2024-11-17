"use client";
import StepOne from "@/components/dashboard/admission/steps/StepOne";
import StepTwo from "@/components/dashboard/admission/steps/StepTwo";
import { useSearchParams } from "next/navigation";
import React from "react";

const AdmissionProcessPage = () => {
   const stepLevel = useSearchParams().get("idx");
   console.log(stepLevel);

   if (stepLevel == 0) {
      return <StepOne />;
   }
   if (stepLevel == 1) {
      return <StepTwo />;
   }
   if (stepLevel == 2) {
      return <div>Third</div>;
   }

   return <div>Hello</div>;
};

export default AdmissionProcessPage;
