"use client";
import React from "react";
import { dashboardSideNav } from "./constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
   const router = usePathname(); // Get the current route from the router

   return (
      <div>
         <div>
            <h1>
               Edu<span>Gate</span>
            </h1>
         </div>
         <ul className="flex flex-col gap-y-[1rem]">
            {dashboardSideNav.map((nav, idx) => {
               // Check if the current route matches the nav item's href
               const isActive = router === nav.href;

               return (
                  <Link
                     key={idx}
                     href={nav.href}
                     className={`flex gap-[.8rem] py-[1rem] px-[1rem] rounded-[10px] ${
                        isActive
                           ? "bg-[#CBE5EB]" // Active background color
                           : "bg-transparent text-[#FFFFFF]/50 font-normal hover:text-[#FFFFFF]/90 transition-all" // Transparent background for non-active links
                     }`}
                  >
                     {nav.icon}
                     {nav.title}
                  </Link>
               );
            })}
         </ul>
      </div>
   );
};

export default SideNav;
