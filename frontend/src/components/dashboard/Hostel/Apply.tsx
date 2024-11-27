"use client";
import { Button } from "@/components/ui/button";
import { useGetHostels } from "@/hooks/useGetHostels";
import Link from "next/link";
import React from "react";

const Apply = () => {
   const hostels = useGetHostels();

   const hostelsInformation = hostels?.data?.hostels;

   console.log(hostelsInformation);

   const hostelList = [
      {
         name: "Hall A",
         price: "45,000",
         gender: "Female",
         remainingSpace: 2,
      },
      {
         name: "Hall B",
         price: "45,000",
         gender: "Female",
         remainingSpace: 10,
      },
      {
         name: "Hall A",
         price: "45,000",
         gender: "Male",
         remainingSpace: 5,
      },
   ];

   const nairaFormatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
   });

   return (
      <div className="bg-white rounded-[20px] p-[2rem] mt-[1rem]">
         <h1 className="text-[1.3rem] font-bold ">Apply for Hostel</h1>
         <p className="text-[#000]/40 text-[.9rem] my-[.5rem] leading-relaxed">
            Browse through available hostels and select your preferred accommodation. Please note
            that hostels are allocated on a first-come, first-served basis. Ensure you have reviewed
            the hostel details before applying.
         </p>

         {/* Hostel List */}
         <div className="mt-[1rem]">
            <h1 className="text-[1rem] font-bold ">Hostel List</h1>

            <div className="grid grid-cols-3 gap-x-3 mt-[1rem]  ">
               {hostelsInformation?.map((hostelInformation, idx) => (
                  <Link
                     href={`${hostelInformation._id}`}
                     key={idx}
                     className="bg-[#FCFCFC] rounded-[20px] p-[2rem] hover:bg-[#02333F] text-[#000] hover:text-white transition-all"
                  >
                     <div className="flex justify-between">
                        <h1 className="font-bold text-[1.4rem]">{hostelInformation?.name}</h1>
                        <p className="text-[#068BAC]">{hostelInformation.genderRestriction}</p>
                     </div>
                     <h1 className="font-bold text-[1.4rem] text-left">
                        {nairaFormatter.format(hostelInformation?.pricePerSemester)}
                        {/* {hostelInformation?.pricePerSemester}{" "} */}
                        <span className="ml-2 font-light text-[13px] text-[#8D8D8D]">
                           Per Semester
                        </span>
                     </h1>

                     <p className="text-[#068BAC] text-left italic">
                        {hostelInformation?.availability?.bedsAvailable} beds remaining
                     </p>
                  </Link>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Apply;
