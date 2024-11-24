"use client";
import DefaultPage from "@/components/dashboard/admission/DefaultPage";
import StepFive from "@/components/dashboard/admission/steps/StepFive";
import StepFour from "@/components/dashboard/admission/steps/StepFour";
import StepOne from "@/components/dashboard/admission/steps/StepOne";
import StepThree from "@/components/dashboard/admission/steps/StepThree";
import StepTwo from "@/components/dashboard/admission/steps/StepTwo";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const AdmissionProcessPage = () => {
   const stepLevel = useSearchParams().get("idx");
   const [paymentDone, setPaymentDone] = useState(false);

   // useEffect(() => {
   //    const paymentType = "Acceptance Fee";
   //    checkPayment(paymentType).then((response) => setPaymentDone(response.data.success));
   // }, [paymentDone]);

   if (stepLevel === "0") {
      return <StepOne />;
   }
   if (stepLevel === "1") {
      return <StepTwo />;
   }
   if (stepLevel === "2") {
      return <StepThree />;
   }

   if (stepLevel === "3") {
      return <StepFour />;
   }
   if (stepLevel === "4") {
      return <StepFive />;
   }

   // console.log(paymentDone)
   return <DefaultPage />;
};

export default AdmissionProcessPage;
