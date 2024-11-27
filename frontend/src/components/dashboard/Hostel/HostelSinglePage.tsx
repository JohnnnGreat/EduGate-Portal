"use client";
import { useGetHostelById } from "@/hooks/useGetHostelById";
import { Hostel } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const HostelSingleComponent = () => {
   const hostelId = usePathname().split("/")[5];

   const hostelInfo = useGetHostelById(hostelId)?.data?.hostel as Hostel;
   console.log(hostelInfo);
   return (
      <div className="p-[1rem]">
         <div className="flex gap-[1rem]">
            <div className="w-[60%]">{hostelInfo?.name}</div>
            <div></div>
         </div>
      </div>
   );
};

export default HostelSingleComponent;
