"use client";
import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import useUserData from "@/hooks/useUserData";

const Header = () => {
   const { data: response, isLoading, error } = useUserData();
   const profileInformation = response?.data;

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
         <div className="flex gap">
            <img
               src={profileInformation?.image}
               alt="Profile Image"
            />
            <div>
               <h1>{profileInformation?.firstName}</h1>
               {/* <p>Last Login {new Date(profileinformation.lastLogin)}</p> */}
            </div>
         </div>
      </div>
   );
};

export default Header;
