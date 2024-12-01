"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideNavIct } from "../constants";
import { adminDashboard } from "./adminConstants";

const SideNavAdmin = () => {
   const [activeIndex, setActiveIndex] = useState(null);

   const toggleSection = (index: any) => {
      setActiveIndex(activeIndex === index ? null : index);
   };

   return (
      <div className="w-full ">
         <div>
            {adminDashboard.map((item, idx) => (
               <div key={idx}>
                  <button
                     className="w-full flex justify-between items-center rounded-[10px] py-[1rem] text-left hover:text-[#02333F!important] transition-all hover:bg-[#02333f31] p-3"
                     onClick={() => toggleSection(idx)}
                  >
                     <div className="flex gap-[1rem] items-center text-[#000]/50 text-[14px]">
                        {item.icon}
                        {item.title}
                     </div>
                     <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M10 17L15 12L10 7"
                           stroke="#B0B0B0"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                        />
                     </svg>
                  </button>
                  <div
                     className={`overflow-hidden transition-all duration-500 ease-in-out  ${
                        activeIndex === idx ? "max-h-screen" : "max-h-0"
                     }`}
                  >
                     <ul className="px-[2.7rem] pb-2 text-gray-700 flex transition-all flex-col gap-[1rem]">
                        {item.sub?.map((item, idx) => (
                           <Link
                              key={idx}
                              href={item?.href}
                              className="hover:text-[#02333F] text-[14px] text-[#000]/50 hover:font-bold hover:transition-all inline-block duration-300"
                           >
                              {item?.title}
                           </Link>
                        ))}
                     </ul>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default SideNavAdmin;
