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
            setBookingInformation(response.bookingInformation);
         } catch (error) {
            setBookingInformation(null);
         }
      })();
   }, []);

   const router = useRouter();
   const handleCancelBooking = async (bookingId: string) => {
      cancelBooking(bookingId, toast, router);
   };

   return (
      <>
         {bookingInformation == null ? (
            <div className="bg-white rounded-2xl p-6 mt-4">
               <h1 className="text-lg font-bold">Apply for Hostel</h1>
               <p className="text-gray-600 text-sm mt-2 mb-4 leading-relaxed">Browse through available hostels and select your preferred accommodation. Please note that hostels are allocated on a first-come, first-served basis. Ensure you have reviewed the hostel details before applying.</p>

               {/* Hostel List */}
               <div>
                  <h1 className="text-base font-bold">Hostel List</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                     {hostelsInformation?.map((hostelInformation: Hostel, idx: number) => (
                        <Link
                           href={`hostel/${hostelInformation._id}`}
                           key={idx}
                           className="bg-gray-50 rounded-2xl p-4 hover:bg-teal-800 text-black hover:text-white transition-all"
                        >
                           <div className="flex justify-between">
                              <h1 className="font-bold text-lg">{hostelInformation?.name}</h1>
                              <p className="text-teal-500">{hostelInformation.genderRestriction}</p>
                           </div>
                           <h1 className="font-bold text-lg mt-2">
                              {nairaFormatter.format(hostelInformation?.pricePerSemester)}
                              <span className="ml-2 font-light text-sm text-gray-500">Per Semester</span>
                           </h1>
                           <p className="text-teal-500 italic mt-1">{hostelInformation?.availability?.bedsAvailable} beds remaining</p>
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         ) : (
            <div className="bg-white rounded-2xl p-6 mt-4">
               <h1 className="text-base font-bold">Booking Information</h1>

               <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4 border rounded-2xl p-4">
                  <div>
                     <h1 className="text-gray-500">Hostel Number</h1>
                     <h1 className="font-bold">{bookingInformation?.hostelId?.name}</h1>
                  </div>
                  <div>
                     <h1 className="text-gray-500">Room Number</h1>
                     <h1 className="font-bold">{bookingInformation?.roomNumber}</h1>
                  </div>
                  <div>
                     <h1 className="text-gray-500">Booking Date</h1>
                     <h1 className="font-bold">{new Date(bookingInformation?.dateOfBooking).toLocaleDateString()}</h1>
                  </div>
                  <div>
                     <h1 className="text-gray-500">Payment Status</h1>
                     <h1 className="font-bold">{bookingInformation?.paymentStatus}</h1>
                  </div>
               </div>

               <button
                  onClick={() => handleCancelBooking(bookingInformation._id)}
                  className="bg-red-100 text-red-500 mt-4 mb-16 py-3 px-8 rounded-lg font-bold hover:shadow"
               >
                  Cancel Booking
               </button>
            </div>
         )}
      </>
   );
};

export default Apply;
