"use client";
// src/hooks/useUserData.js
import { fetchUserData } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Custom hook for fetching user data
const useUserData = () => {
   // Define a query to fetch user data based on a given identifier

   // Use the `useQuery` hook to manage the data fetching
   return useQuery({
      queryKey: ["user"],
      queryFn: () => fetchUserData(),
      enabled: true,
   });
};

export default useUserData;
