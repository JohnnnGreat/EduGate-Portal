"use client";
import AdminHeader from "@/components/dashboard/admin/shared/AdminHeader";
import SideNavAdmin from "@/components/dashboard/ict/SideNavICT";
import { Input } from "@/components/ui/input";
import useAdminData from "@/hooks/useAdminData";
import { Search } from "lucide-react";
import React from "react";

const AdminLayout = ({ children }) => {
   const { data } = useAdminData();

   const adminInformation = data?.admin;
   return (
      <div className="h-full bg-white  overflow-hidden">
         <div className="flex gap-[.6rem] h-full">
            <div className=" w-[300px] h-screen p-[1rem] pb-[5rem] overflow-y-auto border-r">
               <div className="h-[80px]  mb-[.6rem]">
                  <AdminHeader />
               </div>
               <SideNavAdmin />
            </div>
            <div className="flex-1 overflow-y-auto px-[1rem] h-full pb-[6rem]">
               <div className="h-[80px] border-b mb-[.6rem] flex justify-between p-[1rem]">
                  <form
                     action=""
                     className="flex items-center gap-[1.2rem] bg-[#3131310a] py-[.6rem] px-[1rem] rounded-[15px] w-[500px]"
                  >
                     <Search className="text-[#00000086]" />
                     <Input
                        placeholder="Search"
                        className="shadow-none border-none placeholder:text-[#00000086] rounded-[5px!important]"
                     ></Input>
                  </form>
                  <div className="flex gap gap-3 items-center">
                     {/* <img
                        src={profileInformation?.profilePicture ?? ""}
                        alt="Profile Image"
                        className="w-[50px] rounded-full"
                     /> */}
                     <div>
                        <h1 className="font-bold">John</h1>
                     </div>
                  </div>
               </div>

               {children}
            </div>
         </div>
      </div>
   );
};

export default AdminLayout;
