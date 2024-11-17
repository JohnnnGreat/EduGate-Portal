"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const IntroHeader = () => {
   const stepLevel = useSearchParams().get("idx");

   return (
      <div className="bg-white p-[2rem] rounded-[20px]">
         <h1 className="text-[1.3rem] font-bold ">Application Portal</h1>
         <p className="text-[#000]/40 text-[.9rem] my-[.5rem] leading-relaxed">
            This portal will guide you step-by-step through the admission process. Please make sure to provide accurate
            information at each stage. By clicking 'Start Your Application', you’ll begin your personalized admission
            process. Let’s get started on this exciting journey together!
         </p>
         <Link href="/accounts/user/dashboard/process-admission?idx=0">Start Application</Link>
      </div>
   );
};

export default IntroHeader;
