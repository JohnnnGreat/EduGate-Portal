"use client";
import { useSearchParams } from "next/navigation";

const useGetStepLevel = () => {
   const stepLevel = useSearchParams().get("idx");
   return { stepLevel };
};

export default useGetStepLevel;
