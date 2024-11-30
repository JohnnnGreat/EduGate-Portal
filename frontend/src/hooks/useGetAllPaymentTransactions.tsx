"use client";
import { getAllPaymentTransactions } from "@/lib/api/transactions";
// src/hooks/useUserData.js

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Custom hook for fetching user data
const useGetAllPaymentTransactions = () => {
   // Define a query to fetch user data based on a given identifier

   // Use the `useQuery` hook to manage the data fetching
   return useQuery({
      queryKey: ["payments-transactions"],
      queryFn: () => getAllPaymentTransactions(),
      enabled: true,
   });
};

export default useGetAllPaymentTransactions;
