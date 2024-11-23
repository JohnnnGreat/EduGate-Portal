"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useGetAdmission from "@/hooks/useGetAdmission";
import {
   Ban,
   CheckCircleIcon,
   ClockIcon,
   CreditCard,
   GraduationCap,
   TriangleAlert,
   XCircleIcon,
} from "lucide-react";
import { departmentMapping } from "../constants";
import axiosUserClient from "@/lib/api/axiosClient";
import PaystackPop from "@paystack/inline-js";
import useUserData from "@/hooks/useUserData";

const IntroHeader = () => {
   const stepLevel = useSearchParams().get("idx");
   const setDisabled = stepLevel === "4" ? true : false;
   // Navigation array with updated href based on stepLevel
   const nav = [
      {
         title: "Personal Information",
         href: "/accounts/user/dashboard/process-admission?idx=0",
         active: stepLevel === "0", // Determine if this step is active
      },
      {
         title: "Academic Information",
         href: "/accounts/user/dashboard/process-admission?idx=1",
         active: stepLevel === "1", // Determine if this step is active
      },
      {
         title: "Documents",
         href: "/accounts/user/dashboard/process-admission?idx=2",
         active: stepLevel === "2", // Determine if this step is active
      },
      {
         title: "Review Application",
         href: "/accounts/user/dashboard/process-admission?idx=3",
         active: stepLevel === "3", // Determine if this step is active
      },
      {
         title: "Final",
         href: "/accounts/user/dashboard/process-admission?idx=4",
         active: stepLevel === "4", // Determine if this step is active
      },
   ];

   // Check if Application has been started
   const applicationStarted = JSON?.parse(localStorage.getItem("applicationStarted")) ?? false;

   const { data: response, isLoading, error } = useGetAdmission();

   const router = useRouter();
   const handleNavChange = (item) => {
      router.push(item?.href);
   };

   const isApplied = response?.data?.submitted ?? false;
   const admissionNumber = response?.data?.admissionNumber ?? "";
   const faculty = response?.data?.program?.faculty ?? "";
   const department = response?.data?.program?.department ?? "";
   const updatedAt = response?.data?.updatedAt ?? "";
   const status = response?.data?.status ?? "";

   const { data: userData } = useUserData();
   console.log(userData);
   const getDeparmentLabel = (facultyName: string, departmentName: string) => {
      console.log(facultyName, departmentName);
      // Check if the facultyName exists in departmentMapping
      const department = departmentMapping[facultyName]?.filter((item) =>
         item?.value?.includes(departmentName),
      );

      // If department is not found or is empty, return undefined
      if (!department || department.length === 0) {
         return undefined;
      }

      console.log(department);
      // Return the label of the first department that matches
      return department[0]?.label;
   };

   const [loading, setLoading] = useState(false);

   const handlePayment = async () => {
      try {
         setLoading(true);

         // Step 1: Create the payment on the server
         const response = await axiosUserClient.post("http://localhost:5000/api/payments/create", {
            paymentType: "Acceptance Fee", // Payment type (in this case, Acceptance Fee)
            amount: 20000, // Example acceptance fee amount
            // Current academic session
         });

         const { payment } = response.data;

         // Step 2: Call Paystack to process the payment
         handlePaystackPayment(payment.reference, payment.amount);
      } catch (error) {
         console.log(error);
         console.error("Error initiating payment:", error);
         alert("Payment initiation failed. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   const handlePaystackPayment = (reference, amount) => {
      // Load Paystack inline script
      const paystack = PaystackPop.setup({
         key: "pk_test_642faff12375599e2a5b72bad1ee000f88ec51ae", // Paystack public key from environment variable
         email: userData?.data?.email, // Use student's email from user data
         amount: amount * 100, // Paystack expects amount in kobo, so multiply by 100
         reference: reference, // Transaction reference from backend
         onSuccess: (transaction) => {
            console.log(transaction);
            // Payment was successful, redirect user or show success message
            alert("Payment successful! Transaction reference: " + transaction.reference);

            // Optional: Call the backend to verify payment
            verifyPayment(reference);
         },
         onCancel: () => {
            // User cancelled the payment
            alert("Payment was cancelled.");
         },
      });

      paystack.openIframe();
   };

   // Function to verify the payment on the backend
   const verifyPayment = async (reference) => {
      try {
         const response = await axiosUserClient.get(
            `http://localhost:5000/api/payments/verify/${reference}`,
         );
         if (response.data.payment.status === "Success") {
            alert("Payment verified successfully!");
         } else {
            alert("Payment verification failed.");
         }
      } catch (error) {
         console.error("Error verifying payment:", error);
      }
   };

   return (
      <div>
         {" "}
         {!isApplied ? (
            <div className="bg-white p-[2rem] rounded-[20px]">
               <h1 className="text-[1.3rem] font-bold ">Application Portal</h1>
               <p className="text-[#000]/40 text-[.9rem] my-[.5rem] leading-relaxed">
                  This portal will guide you step-by-step through the admission process. Please make
                  sure to provide accurate information at each stage. By clicking 'Start Your
                  Application', you’ll begin your personalized admission process. Let’s get started
                  on this exciting journey together!
               </p>

               {/* Navigation Links */}
               {stepLevel !== null && (
                  <div className="mt-[2rem] flex gap-2">
                     {nav.map((item, index) => (
                        <button
                           key={index}
                           className={`${
                              item.active
                                 ? "bg-[#02333F] ] text-white"
                                 : "bg-transparent text-[#02333F]  border-[#02333f80] border-[2px]"
                           } py-[1rem] px-[1.3rem] rounded-[10px] shadow`}
                           disabled={setDisabled}
                           onClick={() => {
                              handleNavChange(item);
                           }}
                        >
                           {item.title}
                        </button>
                     ))}
                  </div>
               )}

               {/* Show Start Application button if no stepLevel or if stepLevel is 0 */}
               {!stepLevel && (
                  <div>
                     {" "}
                     <Link
                        className="bg-[#02333F] py-[1rem] rounded text-white px-[2rem] font-bold inline-block mt-[1rem]"
                        href="/accounts/user/dashboard/process-admission?idx=0"
                     >
                        Start Application
                     </Link>
                  </div>
               )}
            </div>
         ) : (
            <div className="admission-status-container p-8 rounded-lg">
               {/* Header Section */}
               <header className="mb-6">
                  <h1 className="text-2xl font-semibold text-[#02333F]">
                     Your Current Admission Status
                  </h1>
                  <p className="text-gray-600 mt-2">
                     You have successfully applied. Below are the details of your application and
                     admission status.
                  </p>
               </header>

               {/* Application Information */}
               <section className="application-info bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h2 className="text-xl font-medium text-[#02333F] mb-4">
                     Application Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <h1 className="font-light text-[#000000ad]">Application Number</h1>
                        <p className="text-gray-700 font-bold">{admissionNumber}</p>
                     </div>
                     <div>
                        <h1 className="font-light text-[#000000ad]">Program Applied</h1>
                        <p className="text-gray-700 font-bold">
                           {" "}
                           {getDeparmentLabel(faculty, department)}
                        </p>
                     </div>

                     <div>
                        <h1 className="font-light text-[#000000ad]">Date of Application</h1>
                        <p className="text-gray-700 font-bold">
                           {" "}
                           {new Date(updatedAt).toLocaleDateString("en-GB").replace(/\//g, "/")}
                        </p>
                     </div>
                  </div>
               </section>

               {/* Admission Status */}
               <section className="status-info bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h2 className="text-xl font-medium text-[#02333F] mb-4">Admission Status</h2>
                  <div className="flex items-center">
                     {/* Status Icon */}
                     <div
                        className={`status-icon w-12 h-12 rounded-full flex items-center justify-center ${
                           status === "Admitted"
                              ? "bg-green-200"
                              : status === "Not Admitted"
                              ? "bg-red-200"
                              : status === "Withdrawn"
                              ? "bg-yellow-200"
                              : status === "Graduated"
                              ? "bg-blue-200"
                              : "bg-gray-200"
                        }`}
                     >
                        {/* Dynamic Icon based on status */}
                        {status === "Admitted" && (
                           <CheckCircleIcon className="text-green-600 w-6 h-6" />
                        )}
                        {status === "Not Admitted" && (
                           <XCircleIcon className="text-red-600 w-6 h-6" />
                        )}
                        {status === "Withdrawn" && (
                           <TriangleAlert className="text-yellow-600 w-6 h-6" />
                        )}
                        {status === "Graduated" && (
                           <GraduationCap className="text-blue-600 w-6 h-6" />
                        )}
                        {status === "Suspended" && <Ban className="text-gray-600 w-6 h-6" />}
                     </div>
                     <div className="ml-4">
                        <p
                           className={`text-lg font-semibold ${
                              status === "Admitted"
                                 ? "text-green-600"
                                 : status === "Not Admitted"
                                 ? "text-red-600"
                                 : status === "Withdrawn"
                                 ? "text-yellow-600"
                                 : status === "Graduated"
                                 ? "text-blue-600"
                                 : "text-gray-600"
                           }`}
                        >
                           {status}
                        </p>
                     </div>
                  </div>

                  {/* Conditional Message Based on Status */}
                  <div className="mt-4">
                     {status === "Admitted" && (
                        <div className="text-green-700 bg-green-100 p-4 rounded-lg">
                           <strong>Congratulations!</strong> You have been admitted. Please check
                           your email for the admission letter and follow the instructions provided.
                        </div>
                     )}
                     {status === "Not Admitted" && (
                        <div className="text-red-700 bg-red-100 p-4 rounded-lg">
                           Unfortunately, your application was not accepted. Feel free to contact
                           the admissions office for more details or feedback.
                        </div>
                     )}
                     {status === "Withdrawn" && (
                        <div className="text-yellow-700 bg-yellow-100 p-4 rounded-lg">
                           Your application has been withdrawn. For more details, contact the
                           admissions office.
                        </div>
                     )}
                     {status === "Graduated" && (
                        <div className="text-blue-700 bg-blue-100 p-4 rounded-lg">
                           Congratulations! You have successfully graduated. Best wishes for your
                           future endeavors.
                        </div>
                     )}
                     {status === "Suspended" && (
                        <div className="text-gray-700 bg-gray-100 p-4 rounded-lg">
                           Your application has been suspended. Please contact the admissions office
                           for further clarification.
                        </div>
                     )}
                  </div>
               </section>

               {/* Next Steps (if applicable) */}
               {status === "Admitted" && (
                  <section className="next-steps bg-white p-6 rounded-lg shadow-sm mb-6">
                     <h2 className="text-xl font-medium text-[#02333F] mb-4">Next Steps</h2>
                     <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Download and review the Admission Letter.</li>
                        <li>Complete the enrollment process by the specified deadline.</li>
                        <li>Submit any additional documents required for final registration.</li>
                        <li>Pay the first installment of tuition fees.</li>
                        <li>
                           Attend the orientation session (details provided in the Admission
                           Letter).
                        </li>
                     </ul>
                  </section>
               )}

               {status === "Admitted" && (
                  <Button
                     className="bg-[#02333F] py-[1.6rem] px-[2rem] my-[1rem] font-bold"
                     type="submit"
                     onClick={handlePayment}
                     // disabled={!isError || isSubmitting} // Disable the button if form is invalid or submitting
                  >
                     <CreditCard />
                     Pay Admission Fee
                  </Button>
               )}

               {/* Additional Information */}
               <section className="additional-info bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-medium text-[#02333F] mb-4">Need Assistance?</h2>
                  <p className="text-gray-600">
                     For any queries or assistance regarding your application, please contact our
                     admissions office:
                  </p>
                  <p className="mt-2">
                     <strong>Email:</strong>{" "}
                     <a
                        href="mailto:admissions@university.edu"
                        className="text-blue-600 hover:underline"
                     >
                        admissions@university.edu
                     </a>
                  </p>
                  <p>
                     <strong>Phone:</strong>{" "}
                     <a
                        href="tel:+1234567890"
                        className="text-blue-600 hover:underline"
                     >
                        +123-456-7890
                     </a>
                  </p>
               </section>
            </div>
         )}
      </div>
   );
};

export default IntroHeader;
