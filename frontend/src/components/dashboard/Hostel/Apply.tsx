"use client";
import { Button } from "@/components/ui/button";
import { useGetHostels } from "@/hooks/useGetHostels";
import { cancelBooking, checkBookingInformation } from "@/lib/api/hostel";
import { Booking, Hostel } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Apply = () => {
   const hostels = useGetHostels();

   const hostelsInformation = hostels?.data?.hostels;

   const nairaFormatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
   });

   const [bookingInformation, setBookingInformation] = useState<Booking | null>(null);

   useEffect(() => {
      (async function () {
         try {
            const response = await checkBookingInformation();
            const booking = response.bookingInformation;

            setBookingInformation(booking);
         } catch (error) {
            setBookingInformation(null);
         }
      })();
   }, [bookingInformation]);

   const router = useRouter();
   const handleCancelBooking = async (bookingId: string) => {
      cancelBooking(bookingId, toast, router);
   };
   return (
      <>
         {bookingInformation == null ? (
            <div className="bg-white rounded-[20px] p-[2rem] mt-[1rem]">
               <h1 className="text-[1.3rem] font-bold ">Apply for Hostel</h1>
               <p className="text-[#000]/40 text-[.9rem] my-[.5rem] leading-relaxed">
                  Browse through available hostels and select your preferred accommodation. Please
                  note that hostels are allocated on a first-come, first-served basis. Ensure you
                  have reviewed the hostel details before applying.
               </p>

               {/* Hostel List */}
               <div className="mt-[1rem]">
                  <h1 className="text-[1rem] font-bold ">Hostel List</h1>

                  <div className="grid grid-cols-3 gap-x-3 mt-[1rem]  ">
                     {hostelsInformation?.map((hostelInformation: Hostel, idx: number) => (
                        <Link
                           href={`hostel/${hostelInformation._id}`}
                           key={idx}
                           className="bg-[#FCFCFC] rounded-[20px] p-[2rem] hover:bg-[#02333F] text-[#000] hover:text-white transition-all"
                        >
                           <div className="flex justify-between">
                              <h1 className="font-bold text-[1.4rem]">{hostelInformation?.name}</h1>
                              <p className="text-[#068BAC]">
                                 {hostelInformation.genderRestriction}
                              </p>
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
         ) : (
            <div className="bg-white rounded-[20px] p-[2rem] mt-[1rem]">
               <h1 className="text-[1rem] font-bold ">Booking Information</h1>

               <div className="flex  justify-between gap-[1.2rem] mt-[1rem] border rounded-[20px] p-[1.5rem]">
                  <div>
                     <h1 className="text-[#000]/50">Hostel Number</h1>
                     <h1 className="font-bold">{bookingInformation?.hostelId?.name}</h1>
                  </div>
                  <div>
                     <h1 className="text-[#000]/50">Room Number</h1>
                     <h1 className="font-bold">{bookingInformation?.roomNumber}</h1>
                  </div>
                  <div>
                     <h1 className="text-[#000]/50">Booking Date</h1>
                     <h1 className="font-bold">
                        {new Date(bookingInformation?.dateOfBooking).toLocaleDateString()}
                     </h1>
                  </div>
                  <div>
                     <h1 className="text-[#000]/50">Payment Status</h1>
                     <h1 className="font-bold">{bookingInformation?.paymentStatus}</h1>
                  </div>
               </div>

               <button
                  onClick={() => {
                     handleCancelBooking(bookingInformation._id);
                  }}
                  className="bg-red-100 text-red-500 mt-[1rem] mb-[4rem] py-[1.2rem] px-[4rem] rounded-[10px] font-bold hover:shadow"
               >
                  Cancel Booking
               </button>
            </div>
         )}
      </>
   );
};

export default Apply;
