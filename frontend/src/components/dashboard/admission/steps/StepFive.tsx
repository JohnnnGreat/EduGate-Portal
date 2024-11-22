import React, { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import useGetAdmission from "@/hooks/useGetAdmission";
import useUserData from "@/hooks/useUserData";
import { departmentMapping, faculties } from "./StepTwo";
import { updateAdmission } from "@/lib/api/admission";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const StepFive = () => {
   return (
      <div className="p-[2rem] bg-white rounded-[20px] mt-[1rem]">
         <h1 className="text-[1.3rem] font-bold mb-[.3rem]">Application Submitted Successfully</h1>

         <p className="text-[1rem] text-[#000]/40">
            Congratulations!, We’ve received your application and all the documents you’ve
            submitted. You’re one step closer to joining our community!
         </p>
         <p className="text-[1rem] text-[#000]/40">
            The admission department will review your application, and we’ll send you updates along
            the way. In the meantime, you can visit your dashboard to track the status of your
            application. Click 'Go to Your Dashboard' to keep an eye on your progress.
         </p>

         <div className="flex flex-wrap gap-[1rem]">
            <Button
               className="bg-[#02333F] py-[1.6rem] px-[2rem] font-bold"
               type="submit"
            >
               <Save />
               Submit Application
            </Button>
         </div>
      </div>
   );
};

export default StepFive;
