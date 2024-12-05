import SupportHeader from "@/components/dashboard/Support/SupportHeader";
import React from "react";

const SupportLayout = ({ children }) => {
   return (
      <div className="p-[1rem]">
         <SupportHeader />
         <div>{children}</div>
      </div>
   );
};

export default SupportLayout;
