"use client";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import Image from "next/image";
import React from "react";

const ProfileCard = ({ profile }: { profile: User }) => {
   return (
      <div className="flex gap-[2rem] items-center p-[2rem] rounded-[20px] bg-white mt-[1rem]">
         <div>
            <img
               src={profile?.profilePicture}
               alt="Profile"
               className="w-[200px] h-[200px] border-[2px] border-[#CCE5EB] p-2 rounded-[100%] object-cover" // Add height and object-cover for better styling
            />
         </div>
         <div className="flex flex-col gap-y-[1rem]">
            <h1 className="text-[1.2rem] font-bold ">My Profile</h1>
            <h1 className="font-bold">
               Full Name:{" "}
               <span className="font-normal text-[#000]/80">
                  {profile?.firstName}, {profile?.lastName}
               </span>
            </h1>
            <h1 className="font-bold">
               Email: <span className="font-normal text-[#000]/80">{profile?.email}</span>
            </h1>
            <h1 className="font-bold">
               Phone Number:{" "}
               <span className="font-normal text-[#000]/80">{profile?.phoneNumber}</span>
            </h1>
            <h1 className="font-bold">
               Residential Address:{" "}
               <span className="font-normal text-[#000]/80">{profile?.address}</span>
            </h1>
            <h1 className="font-bold">
               Date of Birth:{" "}
               <span className="font-normal text-[#000]/80">
                  {new Date(profile?.dateOfBirth).toLocaleDateString()}
               </span>
            </h1>

            <Button
               variant="outline"
               className="py-[1rem!important]"
            >
               Edit Profile
            </Button>
         </div>
      </div>
   );
};

export default ProfileCard;
