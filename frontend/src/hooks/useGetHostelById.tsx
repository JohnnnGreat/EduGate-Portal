"use client";

import { getAllHostels, getHostelById } from "@/lib/api/hostel";
import { useQuery } from "@tanstack/react-query";

export const useGetHostelById = (id: string) => {
   return useQuery({
      queryKey: ["hostels"],
      queryFn: () => getHostelById(id && id),
      // enabled: true,
   });
};
