"use client";
import useUserData from "@/hooks/useUserData";
import { Hand } from "lucide-react";
import React from "react";
import ProfileCard from "./ProfileCard";
import SemesterInformation from "./SemesterInformation";
import useGetAdmission from "@/hooks/useGetAdmission";
import AcademicInformation from "./AcademicInformation";

const ProfileComponent = () => {
   const { data } = useUserData();
   const userProfile = data?.data;
   const { data: response } = useGetAdmission();

   const admissionInformation = response?.data;
   return (
      <div className="p-[1rem]">
         {/* Header */}
         <div className="p-[2rem] bg-white rounded-[20px]">
            <div className="flex gap-1 items-center">
               <Hand />
               <h1 className="ml-[1rem] text-[24px] font-bold">
                  Welcome, <span className="font-normal">{userProfile?.lastName}</span>
               </h1>
            </div>
            <p className="text-[#000000]/50 mt-[.8rem] text-[.9rem">
               This is your personal hub. Keep your information updated so you never miss an important announcement, deadline, or opportunity. From here, you can edit your details, review your academic records, and manage your account settings. Let's make sure everything's up to date!
            </p>
         </div>

         <div className="flex gap-[1rem] flex-wrap">
            {/* Profile Card */}
            <ProfileCard profile={userProfile} />
            <SemesterInformation semesterInformation={admissionInformation} />
         </div>

         <div>
            <AcademicInformation academicInformation={admissionInformation} />
         </div>
      </div>
   );
};

export default ProfileComponent;
