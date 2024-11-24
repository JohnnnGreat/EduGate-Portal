"use client";
import IntroHeader from "@/components/dashboard/admission/IntroHeader";
import React, { useState, useEffect } from "react";
import { checkPayment } from "@/lib/api/transactions";

const AdmissionPageLayout = ({ children }: { children: React.ReactNode }) => {
   const [acceptancePaymentDone, setAcceptancePaymentDone] = useState(false);
   useEffect(() => {
      const paymentType = "Acceptance Fee";
      checkPayment(paymentType).then((response) => setAcceptancePaymentDone(response.success));
   });

   return (
      <div className="p-[1rem]">
         {acceptancePaymentDone ? (
            <div>
               <h1>You Admission Status has been updated</h1>
            </div>
         ) : (
            <>
               {" "}
               <IntroHeader />
               {children}
            </>
         )}
      </div>
   );
};

export default AdmissionPageLayout;
