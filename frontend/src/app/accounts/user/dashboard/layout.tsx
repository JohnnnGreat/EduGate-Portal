"use client";
import Header from "@/components/dashboard/Header";
import SideNav from "@/components/dashboard/SideNav";
import useUserData from "@/hooks/useUserData";
import React from "react";

const DashboardLayout = ({ children }) => {
   const { data: user, isLoading, error } = useUserData();

   console.log(user);
   return (
      <div className="h-screen p-[1rem] flex gap-[.6rem]">
         <div className="bg-[#02333F] w-[250px] rounded-[20px] p-[1rem] overflow-y-scroll">
            <SideNav />
         </div>
         <div className="flex-1 overflow-y-scroll">
            <Header />
            {children}
         </div>
      </div>
   );
};

export default DashboardLayout;
