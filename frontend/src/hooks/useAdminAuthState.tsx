"use client";
import { useRouter } from "next/navigation";
import React from "react";

const useAdminAuthState = () => {
   const router = useRouter();
   // Check if Admin Access Token exist

   const adminAccessToken = localStorage.getItem("adminAccess");

   if (adminAccessToken) {
      router.push("/accounts/ict/dashboard");
   } else {
      router.push("/accounts/ict/auth/login");
   }
};

export default useAdminAuthState;
