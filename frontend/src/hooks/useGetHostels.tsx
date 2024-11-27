"use client";

import { getAllHostels } from "@/lib/api/hostel";
import { useQuery } from "@tanstack/react-query";

export const useGetHostels = () => {
   return useQuery({
      queryKey: ["hostels"],
      queryFn: () => getAllHostels(),
      // enabled: true,
   });
};
