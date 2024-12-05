"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SupportHeader: React.FC = () => {
   const stepLevel = useSearchParams().get("idx");
   const router = useRouter();

   const nav = [
      {
         title: "FAQs",
         href: "/accounts/user/dashboard/support?idx=0",
         active: stepLevel === "0",
      },
      {
         title: "Raise a Ticket",
         href: "/accounts/user/dashboard/support?idx=1",
         active: stepLevel === "1",
      },
      {
         title: "Contact Us",
         href: "/accounts/user/dashboard/support?idx=2",
         active: stepLevel === "2",
      },
      {
         title: "Track Ticket",
         href: "/accounts/user/dashboard/support?idx=3",
         active: stepLevel === "3",
      },
   ];

   const handleNavChange = (item: (typeof nav)[number]) => {
      router.push(item.href);
   };

   return (
      <div className="bg-white p-4 md:p-8 rounded-2xl">
         <h1 className="text-xl font-bold">Support Center</h1>
         <p className="text-gray-600 text-sm my-2 leading-relaxed">Find quick answers or connect with our support team for personalized assistance.</p>

         <div className="mt-8 flex gap-2 pb-[1rem] overflow-x-auto">
            {nav.map((item, index) => (
               <Button
                  key={index}
                  className={`
              py-4 px-5 rounded-lg shadow
              ${item.active ? "bg-[#02333F] text-white" : "bg-transparent text-[#02333F] hover:text-white hover:bg-[#02333F] border-[#02333f80] border-2"}
            `}
                  onClick={() => handleNavChange(item)}
               >
                  {item.title}
               </Button>
            ))}
         </div>
      </div>
   );
};

export default SupportHeader;
