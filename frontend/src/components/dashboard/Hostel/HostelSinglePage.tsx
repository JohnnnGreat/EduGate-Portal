"use client";
import { useGetHostelById } from "@/hooks/useGetHostelById";
import { applyForHostel, checkBookingInformation } from "@/lib/api/hostel";
import { Hostel } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HostelSingleComponent = () => {
   const hostelId = usePathname().split("/")[5];

   const hostelInfo = useGetHostelById(hostelId)?.data?.hostel as Hostel;

   const handleApplyForHostel = () => {};

   const router = useRouter();
   return (
      <div className="p-[1rem]">
         <div className="flex gap-[1rem]">
            <div className="w-[60%] bg-white rounded-[20px] p-[3rem]">
               <h1 className="text-[26px] font-bold mt-[.2rem]">{hostelInfo?.name}</h1>
               <p className="text-[#000]/50 mt-[.2rem]">{hostelInfo?.description}</p>
               <h1 className="text-[#02333F] text-[26px] font-bold mt-[.4rem]">
                  {hostelInfo?.pricePerSemester}
               </h1>
               <p className="mt-[1rem] bg-[#f3f3f3] inline-block rounded-[10px] py-[.8rem] px-[1.3rem]">
                  {hostelInfo?.genderRestriction}
               </p>
            </div>
            <div></div>
         </div>

         <div className="flex gap-[1rem] rounded-[20px]">
            <div className="w-[60%]  p-[3rem]">
               <h1 className="text-[26px] font-bold mt-[.2rem]">Room</h1>
               {hostelInfo?.rooms?.map((item) => (
                  <div className="grid grid-cols-3 mt-[1rem]">
                     <div>
                        <h1 className="text-[#000000]/50">Room Number</h1>
                        <h1 className="font-bold">{item?.roomNumber}</h1>
                     </div>
                     <div>
                        <h1 className="text-[#000000]/50">Beds Capacity</h1>
                        <h1 className="font-bold">{item?.bedCapacity}</h1>
                     </div>
                     <div>
                        <h1 className="text-[#000000]/50">Beds Available</h1>
                        <h1 className="font-bold">{item?.bedsAvailable}</h1>
                     </div>
                  </div>
               ))}
            </div>
            <div className="bg-white p-[2.5rem] w-[40%] rounded-[20px]">
               <h1 className="text-[26px] font-bold mt-[.2rem]">Facilities</h1>
               <div className="flex gap-[.9rem] flex-wrap mt-[1rem]">
                  {" "}
                  {hostelInfo?.facilities?.map((item, idx) => (
                     <p className="border border-[black] py-[.8rem] px-[1.2rem] rounded-full">
                        {item}
                     </p>
                  ))}
               </div>
            </div>
         </div>

         <div className="bg-white p-[2.5rem] rounded-[20px] mt-[1rem]">
            <h1 className="text-[26px] font-bold mt-[.2rem]">Contact Information</h1>

            <div className="flex gap-[4rem] mt-[1rem]">
               <div>
                  <h1 className="text-[#000]/50">Email Address</h1>
                  <h1 className="font-bold">{hostelInfo?.contactInfo?.email}</h1>
               </div>
               <div>
                  <h1 className="text-[#000]/50">Phone Number</h1>
                  <h1 className="font-bold">{hostelInfo?.contactInfo?.phone}</h1>
               </div>
            </div>
         </div>

         <button
            onClick={() => {
               applyForHostel(hostelInfo?._id, toast, router);
            }}
            className="bg-[#02333F] mt-[1rem] mb-[4rem] py-[1.2rem] px-[4rem] rounded-[10px] text-[#fff]/50 uppercase hover:text-[#fff]"
         >
            Apply for this Hostel
         </button>
      </div>
   );
};

export default HostelSingleComponent;
