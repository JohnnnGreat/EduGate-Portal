"use client";

import { getAllTransactionsByUser } from "@/lib/api/transactions";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionsByUser = () => {
   return useQuery({
      queryKey: ["transactions"],
      queryFn: () => getAllTransactionsByUser(),
      // enabled: true,
   });
};
