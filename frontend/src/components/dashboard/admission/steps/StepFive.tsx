import React, { useState } from "react";
import { Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import useGetAdmission from "@/hooks/useGetAdmission";
import Link from "next/link";

const StepFive = () => {
   const { data: admissionInformation, isLoading, error } = useGetAdmission();
   console.log(admissionInformation?.data?.fileUrl);

   return (
      <div className="p-[2rem] bg-white rounded-[20px] mt-[1rem]">
         <h1 className="text-[1.3rem] font-bold mb-[.3rem]">Application Submitted Successfully</h1>

         <p className="text-[1rem] text-[#000]/40 leading-relaxed">
            Congratulations!, We’ve received your application and all the documents you’ve
            submitted. You’re one step closer to joining our community!
         </p>
         <p className="text-[1rem] text-[#000]/40 leading-relaxed">
            The admission department will review your application, and we’ll send you updates along
            the way. In the meantime, you can visit your dashboard to track the status of your
            application. Click 'Go to Your Dashboard' to keep an eye on your progress.
         </p>

         <div className="flex flex-wrap gap-[1rem] mt-[1rem]">
            <Link
               href="/accounts/user/dashboard"
               className="border border-[#02333F] py-[1.6rem] px-[2rem] font-bold flex gap-2 h-[51px] rounded justify-center items-center"
               type="submit"
            >
               <Download className="w-4" />
               Back to Dashboard
            </Link>
            <Link
               href={admissionInformation?.data?.fileUrl ?? ""}
               className="border border-[#02333F] py-[1.6rem] px-[2rem] font-bold flex gap-2 h-[51px] rounded justify-center items-center"
               type="submit"
            >
               <Download className="w-4" />
               Download Application Summary
            </Link>
         </div>
      </div>
   );
};

export default StepFive;
