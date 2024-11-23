import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useUserData from "@/hooks/useUserData";
import useGetAdmission from "@/hooks/useGetAdmission";
import useGetStepLevel from "@/hooks/useGetStepLevel";
import { updateAdmission } from "@/lib/api/admission";
import PersonalInformation from "./StepsComponents/PersonalInformation";
import { User } from "@/types";

const StepFour = () => {
   // Custom Hooks
   const { data: userData } = useUserData();
   const { data: admissionData, isLoading, error } = useGetAdmission();
   const { stepLevel } = useGetStepLevel();

   const router = useRouter();

   // Handlers
   const handlePrevious = () => {
      const previousStep = Number(stepLevel) - 1;
      router.push(`/accounts/user/dashboard/process-admission?idx=${previousStep}`);
   };

   // React Query Mutation for form submission
   const { mutateAsync, isPending } = useMutation({
      mutationFn: (values: { submitted: Boolean }) => updateAdmission(values),
      onError: (error: any) => {
         toast.error(error.message);
      },
      onSuccess: (data: User) => {
         toast.success(data.message);
         router.push(`/accounts/user/dashboard/process-admission?idx=4`);

         const nextLevel = Number(stepLevel) + 1;
         localStorage.setItem("applicationLevel", nextLevel.toString());
      },
   });

   const handleSubmitApplication = () => {
      mutateAsync({ submitted: true });
   };

   return (
      <div className="p-8 bg-white rounded-lg mt-4">
         <h1 className="text-xl font-bold mb-2">Review Your Application</h1>
         <p className="text-base text-gray-500">
            Take a moment to review everything you’ve entered. If all looks good, submit your
            application!
         </p>

         <PersonalInformation
            profileInformation={userData?.data}
            admissionInformation={admissionData}
            handlePrevious={handlePrevious}
            handleSubmitApplication={handleSubmitApplication}
         />
      </div>
   );
};

export default StepFour;
