import React from "react";

const PaymentsHeader = ({ title, description }: { title: string; description: string }) => {
   return (
      <div className="py-[2rem] border-b">
         <h1 className="font-bold text-[24px]">{title}</h1>
         <p className="text-[#000]/50 mt-1">{description}</p>
      </div>
   );
};

export default PaymentsHeader;
