"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const IntroHeader = () => {
   const stepLevel = useSearchParams().get("idx");
   console.log(stepLevel);
   // Navigation array with updated href based on stepLevel
   const nav = [
      {
         title: "Personal Information",
         href: "/accounts/user/dashboard/process-admission?idx=0",
         active: stepLevel === "0", // Determine if this step is active
      },
      {
         title: "Academic Information",
         href: "/accounts/user/dashboard/process-admission?idx=1",
         active: stepLevel === "1", // Determine if this step is active
      },
      {
         title: "Documents",
         href: "/accounts/user/dashboard/process-admission?idx=2",
         active: stepLevel === "2", // Determine if this step is active
      },
   ];

   // Check if Application has been started
   const applicationStarted = JSON?.parse(localStorage.getItem("applicationStarted")) ?? false;

   return (
      <div className="bg-white p-[2rem] rounded-[20px]">
         <h1 className="text-[1.3rem] font-bold ">Application Portal</h1>
         <p className="text-[#000]/40 text-[.9rem] my-[.5rem] leading-relaxed">
            This portal will guide you step-by-step through the admission process. Please make sure
            to provide accurate information at each stage. By clicking 'Start Your Application',
            you’ll begin your personalized admission process. Let’s get started on this exciting
            journey together!
         </p>

         {/* Navigation Links */}
         {stepLevel !== null && (
            <div className="mt-[2rem] flex gap-2">
               {nav.map((item, index) => (
                  <Link
                     key={index}
                     className={`${
                        item.active
                           ? "bg-[#02333F] ] text-white"
                           : "bg-transparent text-[#02333F]  border-[#02333f80] border-[2px]"
                     } block py-[1rem] rounded px-[1.7rem] font-bold inline-block hover:bg-[#02333f31] text-[.9rem]`}
                     href={item.href}
                  >
                     {item.title}
                  </Link>
               ))}
            </div>
         )}

         {/* Show Start Application button if no stepLevel or if stepLevel is 0 */}
         {!stepLevel && (
            <div>
               {" "}
               <Link
                  className="bg-[#02333F] py-[1rem] rounded text-white px-[2rem] font-bold inline-block mt-[1rem]"
                  href="/accounts/user/dashboard/process-admission?idx=0"
               >
                  Start Application
               </Link>
            </div>
         )}
      </div>
   );
};

export default IntroHeader;
