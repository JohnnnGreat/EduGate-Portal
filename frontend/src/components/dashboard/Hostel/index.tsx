import React from "react";
import Apply from "./Apply";

const HostelComponent = () => {
   const isApplied = true;
   const hostelStatus = "Approved";
   return (
      <div className="p-4 md:p-[1rem]">
         <div className="bg-white rounded-[20px] p-[1rem] md:p-[2rem]">
            <h1 className="text-[1.3rem] font-bold">Hostel Accommodation Overview</h1>
            <p className="text-[#000]/40 text-[.9rem] my-[.5rem] leading-relaxed">
               Welcome to the Hostel Accommodation Section. Here, you can apply for a hostel, check your allocation status, make payments, and manage any accommodation-related matters. Please ensure you read all instructions carefully to secure your preferred accommodation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-[2rem] gap-[1rem]">
               {hostelStatus === "Approved" && (
                  <div>
                     <h1 className="font-bold">Current Room</h1>
                     <p className="text-[#000]/40 text-[.9rem] my-[.5rem] leading-relaxed">Hall A - Room 205, Bed 2</p>
                  </div>
               )}
               <div>
                  <h1 className="font-bold">Hostel Application Status</h1>
                  <p className="text-[#000]/40 text-[.9rem] my-[.5rem] leading-relaxed">Application Pending Review</p>
               </div>
            </div>
         </div>

         <Apply />
      </div>
   );
};

export default HostelComponent;
