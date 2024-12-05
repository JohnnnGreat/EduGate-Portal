"use client";
import { useGetHostelById } from "@/hooks/useGetHostelById";
import { applyForHostel } from "@/lib/api/hostel";
import { Hostel } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const HostelSingleComponent = () => {
   const hostelId = usePathname().split("/")[5];
   const hostelInfo = useGetHostelById(hostelId)?.data?.hostel as Hostel;
   const router = useRouter();

   return (
      <div className="p-4 md:p-6">
         {/* Hostel Info Section */}
         <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white rounded-2xl p-6 md:p-8">
               <h1 className="text-xl md:text-2xl font-bold">{hostelInfo?.name}</h1>
               <p className="text-gray-500 mt-2">{hostelInfo?.description}</p>
               <h1 className="text-lg md:text-xl font-bold text-[#02333F] mt-4">{hostelInfo?.pricePerSemester}</h1>
               <p className="mt-4 bg-gray-100 inline-block rounded-lg py-2 px-4">{hostelInfo?.genderRestriction}</p>
            </div>
            <div className="hidden md:block"></div>
         </div>

         {/* Room Details Section */}
         <div className="grid gap-4 mt-6 md:grid-cols-2">
            <div className="p-6 md:p-8">
               <h1 className="text-xl md:text-2xl font-bold">Room</h1>
               {hostelInfo?.rooms?.map((item, index) => (
                  <div
                     key={index}
                     className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
                  >
                     <div>
                        <h1 className="text-gray-500">Room Number</h1>
                        <h1 className="font-bold">{item?.roomNumber}</h1>
                     </div>
                     <div>
                        <h1 className="text-gray-500">Beds Capacity</h1>
                        <h1 className="font-bold">{item?.bedCapacity}</h1>
                     </div>
                     <div>
                        <h1 className="text-gray-500">Beds Available</h1>
                        <h1 className="font-bold">{item?.bedsAvailable}</h1>
                     </div>
                  </div>
               ))}
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl">
               <h1 className="text-xl md:text-2xl font-bold">Facilities</h1>
               <div className="flex gap-2 flex-wrap mt-4">
                  {hostelInfo?.facilities?.map((item, idx) => (
                     <p
                        key={idx}
                        className="border border-black py-2 px-3 rounded-full text-sm md:text-base"
                     >
                        {item}
                     </p>
                  ))}
               </div>
            </div>
         </div>

         {/* Contact Information */}
         <div className="bg-white p-6 md:p-8 rounded-2xl mt-6">
            <h1 className="text-xl md:text-2xl font-bold">Contact Information</h1>
            <div className="grid gap-4 mt-4 md:grid-cols-2">
               <div>
                  <h1 className="text-gray-500">Email Address</h1>
                  <h1 className="font-bold">{hostelInfo?.contactInfo?.email}</h1>
               </div>
               <div>
                  <h1 className="text-gray-500">Phone Number</h1>
                  <h1 className="font-bold">{hostelInfo?.contactInfo?.phone}</h1>
               </div>
            </div>
         </div>

         {/* Apply Button */}
         <button
            onClick={() => applyForHostel(hostelInfo?._id, toast, router)}
            className="bg-[#02333F] w-full mt-6 py-3 rounded-lg text-white uppercase hover:bg-[#025050] transition"
         >
            Apply for this Hostel
         </button>
      </div>
   );
};

export default HostelSingleComponent;
