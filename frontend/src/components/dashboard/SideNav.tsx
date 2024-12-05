"use client";
import React, { useState } from "react";
import { dashboardSideNav } from "./constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

const SideNav = () => {
   const router = usePathname();
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   return (
      <>
         {/* Mobile Hamburger Button */}
         <button
            onClick={toggleMobileMenu}
            className="fixed top-4 left-4 z-50 md:hidden p-2 bg-[#CBE5EB]/20 backdrop-blur-sm rounded-full"
         >
            {isMobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
         </button>

         {/* Desktop Sidebar */}
         <div className="hidden md:block w-[250px] bg-[#1A2B3C] min-h-screen p-4 text-white">
            <div className="h-[100px] flex items-center p-[1rem]">
               <h1 className="font-light text-[#fff]/90 text-[1.6rem]">
                  Edu<span className="font-bold">Gate</span>
               </h1>
            </div>
            <ul className="flex flex-col gap-y-[1rem]">
               {dashboardSideNav.map((nav, idx) => {
                  const isActive = router === nav.href;

                  return (
                     <Link
                        key={idx}
                        href={nav.href}
                        className={`flex items-center gap-[.8rem] py-[.8rem] px-[1rem] rounded-[10px] group transition-all duration-300 ${isActive ? "bg-[#CBE5EB] text-[#1A2B3C]" : "bg-transparent text-[#FFFFFF]/50 hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]/90"}`}
                     >
                        {React.cloneElement(nav.icon, {
                           className: `${isActive ? "text-[#1A2B3C]" : "text-[#FFFFFF]/50 group-hover:text-[#FFFFFF]/90"}`,
                        })}
                        <span className="text-inherit">{nav.title}</span>
                        <ChevronRight
                           className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? "text-[#1A2B3C]" : "text-[#FFFFFF]/50"}`}
                           size={18}
                        />
                     </Link>
                  );
               })}
            </ul>
         </div>

         {/* Mobile Sliding Drawer */}
         <div className={`fixed inset-0 z-40 md:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} bg-[#1A2B3C] min-h-screen`}>
            <div className="h-[100px] flex items-center p-[1rem] justify-between">
               <h1 className="font-light text-[#fff]/90 text-[1.6rem]">
                  Edu<span className="font-bold">Gate</span>
               </h1>
            </div>
            <ul className="flex flex-col gap-y-[1rem] px-4">
               {dashboardSideNav.map((nav, idx) => {
                  const isActive = router === nav.href;

                  return (
                     <Link
                        key={idx}
                        href={nav.href}
                        onClick={toggleMobileMenu}
                        className={`flex items-center gap-[.8rem] py-[.8rem] px-[1rem] rounded-[10px] group transition-all duration-300 ${isActive ? "bg-[#CBE5EB] text-[#1A2B3C]" : "bg-transparent text-[#FFFFFF]/50 hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]/90"}`}
                     >
                        {React.cloneElement(nav.icon, {
                           className: `${isActive ? "text-[#1A2B3C]" : "text-[#FFFFFF]/50 group-hover:text-[#FFFFFF]/90"}`,
                        })}
                        <span className="text-inherit">{nav.title}</span>
                        <ChevronRight
                           className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? "text-[#1A2B3C]" : "text-[#FFFFFF]/50"}`}
                           size={18}
                        />
                     </Link>
                  );
               })}
            </ul>
         </div>

         {/* Mobile Menu Overlay */}
         {isMobileMenuOpen && (
            <div
               onClick={toggleMobileMenu}
               className="fixed inset-0 z-30 bg-black/50 md:hidden"
            />
         )}
      </>
   );
};

export default SideNav;
