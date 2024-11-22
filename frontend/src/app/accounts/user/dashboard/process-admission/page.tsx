"use client";
import DefaultPage from "@/components/dashboard/admission/DefaultPage";
import StepOne from "@/components/dashboard/admission/steps/StepOne";
import StepThree from "@/components/dashboard/admission/steps/StepThree";
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
      return <StepThree />;
   }

   return <DefaultPage />;
};

export default AdmissionProcessPage;
