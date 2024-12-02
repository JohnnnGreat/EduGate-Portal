"use client";
import { fetchAdminData } from "@/lib/api/admin";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Custom hook for fetching user data
const useAdminData = () => {
   // Define a query to fetch user data based on a given identifier

   // Use the `useQuery` hook to manage the data fetching
   return useQuery({
      queryKey: ["admin"],
      queryFn: () => fetchAdminData(),
      enabled: true,
   });
};

export default useAdminData;
