import IntroHeader from "@/components/dashboard/admission/IntroHeader";
import React from "react";

const AdmissionPageLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="p-[1rem]">
         <IntroHeader />
         {children}
      </div>
   );
};

export default AdmissionPageLayout;
