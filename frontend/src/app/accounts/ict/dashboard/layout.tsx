import SideNavAdmin from "@/components/dashboard/ict/SideNavICT";
import React from "react";

const AdminLayout = ({ children }) => {
   return (
      <div className="h-full bg-white  overflow-hidden">
         <div className="h-[80px] border-b"></div>
         <div className="flex gap-[.6rem] h-full">
            <div className=" w-[300px]  p-[1rem] pb-[5rem] overflow-y-auto border-r">
               <SideNavAdmin />
            </div>
            <div className="flex-1 overflow-y-auto px-[1rem] h-full pb-[6rem]">{children}</div>
         </div>
      </div>
   );
};

export default AdminLayout;
