"use client";
import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import useUserData from "@/hooks/useUserData";
import useGetAdmission from "@/hooks/useGetAdmission";

const Header = () => {
   const { data: response, isLoading, error } = useUserData();
   const { data: adResponse } = useGetAdmission();
   const profileInformation = response?.data;
   const admissionInformation = adResponse?.data;
   return (
      <div className="w-full flex justify-between  p-[1rem] rounded-[20px] ">
         <form
            action=""
            className="flex items-center gap-[1.2rem] bg-[#3131310a] py-[.6rem] px-[1rem] rounded-[15px] w-[500px]"
         >
            <Search className="text-[#00000086]" />
            <Input
               placeholder="Search"
               className="shadow-none border-none placeholder:text-[#00000086]"
            ></Input>
         </form>
         <div className="flex gap gap-3 items-center">
            <img
               src={profileInformation?.profilePicture}
               alt="Profile Image"
               className="w-[50px] rounded-full"
            />
            <div>
               <h1 className="font-bold">{profileInformation?.firstName}</h1>
               {admissionInformation?.matNumber ? (
                  <p className="text-[#000]/70 text-[.7rem]">{admissionInformation?.matNumber}</p>
               ) : (
                  <p className="text-red-500 ">Not Available</p>
               )}

               {/* <p>Last Login {new Date(profileinformation.lastLogin)}</p> */}
            </div>
         </div>
      </div>
   );
};

export default Header;
