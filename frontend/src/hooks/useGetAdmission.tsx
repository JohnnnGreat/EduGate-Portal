"use client";
import { getAdmission } from "@/lib/api/admission";
// src/hooks/useUserData.js
import { fetchUserData } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Custom hook for fetching user data
const useGetAdmission = () => {
   return useQuery({
      queryKey: ["admission"],
      queryFn: () => getAdmission(),
      enabled: true,
   });
};

export default useGetAdmission;
