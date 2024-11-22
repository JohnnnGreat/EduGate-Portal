import { Button } from "@/components/ui/button";
import { updateAdmission } from "@/lib/api/admission";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, Save, Upload } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const StepThree = () => {
   const [selectedBirthCertificate, setSelectedBirthCertificate] = useState(null);
   const [selectedOLevelResults, setSelectedOLevelResults] = useState(null);
   const [uploadStatus, setUploadStatus] = useState({
      birthCertificate: "",
      oLevelResults: "",
   });

   const [birthCertificate, setBirthCertificate] = useState("");
   const [oLevel, setOLevel] = useState("");
   const [uploadProgress, setUploadProgress] = useState({
      birthCertificate: 0,
      oLevelResults: 0,
   });

   const [loader, setLoader] = useState({
      birthCertification: false,
      oLevel: false,
   });

   const handleFileChange = (event, type) => {
      if (type === "birthCertificate") {
         setSelectedBirthCertificate(event.target.files[0]);
         setUploadStatus({ ...uploadStatus, birthCertificate: "" });
         setUploadProgress({ ...uploadProgress, birthCertificate: 0 });
      } else {
         setSelectedOLevelResults(event.target.files[0]);
         setUploadStatus({ ...uploadStatus, oLevelResults: "" });
         setUploadProgress({ ...uploadProgress, oLevelResults: 0 });
      }
   };

   const handleUpload = async (type) => {
      if (type === "birthCertificate") {
         setLoader((prevLoader) => ({ ...prevLoader, birthCertification: true }));
      } else {
         setLoader((prevLoader) => ({ ...prevLoader, oLevel: true }));
      }
      const formData = new FormData();
      let file;
      if (type === "birthCertificate") {
         file = selectedBirthCertificate;
      } else {
         file = selectedOLevelResults;
      }

      if (!file) {
         setUploadStatus((prevStatus) => ({
            ...prevStatus,
            [type]: "Please select a file to upload.",
         }));
         return;
      }

      formData.append("file", file);

      try {
         const response = await axios.post("http://localhost:9000/upload", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         if (response.data.success) {
            setUploadStatus((prevStatus) => ({
               ...prevStatus,
               [type]: "File uploaded successfully!",
            }));

            if (type == "birthCertificate") {
               setBirthCertificate(response.data.fileUrl);
            } else {
               setOLevel(response.data.fileUrl);
            }
            console.log(response);
         } else {
            setUploadStatus((prevStatus) => ({
               ...prevStatus,
               [type]: "Error uploading file.",
            }));
         }
      } catch (error) {
         setUploadStatus((prevStatus) => ({
            ...prevStatus,
            [type]: "Error uploading file: " + error.message,
         }));
      } finally {
         setLoader((prevLoader) => ({ ...prevLoader, birthCertification: false, oLevel: false }));
      }
   };

   const [isError, setIsError] = useState(false);
   const router = useRouter();
   const { mutateAsync, isPending } = useMutation({
      mutationFn: (values: { birthCertificate: string; oLevelResult: string }) =>
         updateAdmission(values),
      onError: (error: any) => {
         toast.error(error.message);
         setIsError(true);
      },
      onSuccess: (data) => {
         console.log(data);
         toast.success(data.message);
         router.push(`/accounts/user/dashboard/process-admission?idx=${3}`);
         //  const currentLevel = Number(applicationLevel) + 1;
         //  localStorage.setItem("applicationLevel", currentLevel.toString());
      },
   });
   const handleSaveInformation = async () => {
      // Log the values for debugging (ensure to remove in production)
      console.log(birthCertificate, oLevel);

      // Validate that the required files are uploaded
      if (!birthCertificate) {
         return toast.error("Please upload your birth certificate.");
      }
      if (!oLevel) {
         return toast.error("Please upload your O-Level result.");
      }

      // Prepare the payload for the API request
      const payload = {
         birthCertificate,
         oLevelResult: oLevel,
      };

      try {
         // Call the mutation function to save the information
         await mutateAsync(payload);

         // Optionally notify the user that the information has been saved successfully
         toast.success("Information saved successfully!");
      } catch (error) {
         // Handle potential errors that may occur during the mutation
         console.error("Error saving information:", error);
         toast.error("An error occurred while saving the information. Please try again.");
      }
   };

   let stepLevel = useSearchParams().get("idx");

   const handlePrevious = () => {
      router.push(
         `http://localhost:3000/accounts/user/dashboard/process-admission?idx=${
            Number(stepLevel) - 1
         }`,
      );
   };

   return (
      <div className="p-8 bg-white rounded-[20px] mt-4">
         <h1 className="text-[1.3rem] font-bold mb-[.3rem]">Upload Your Documents</h1>
         <p className="text-base text-gray-500">
            Please upload your supporting documents to complete your application.
         </p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
            <div>
               <h1 className="text-[1rem] font-bold mb-[.3rem] mt-[1rem]">Birth Certificate</h1>{" "}
               <p className="text-base text-gray-500">
                  Please upload a copy of your birth certificate to verify your identity.
               </p>
               <label
                  htmlFor="birth-certificate-upload"
                  className="flex hover:border-black items-center justify-center block font-bold mb-2 border border-red rounded-[20px] h-[200px] cursor-pointer mt-[1rem]"
               >
                  Click to Upload
               </label>
               <input
                  type="file"
                  id="birth-certificate-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "birthCertificate")}
                  className="block w-full mb-4 hidden"
               />
               {uploadStatus.birthCertificate && (
                  <div
                     className={`mb-2 ${
                        uploadStatus.birthCertificate.includes("Error")
                           ? "text-red-500"
                           : "text-green-500"
                     }`}
                  >
                     {uploadStatus.birthCertificate}
                  </div>
               )}
               {selectedBirthCertificate && (
                  <div className="mb-4">
                     <p className="text-gray-400">Selected file: {selectedBirthCertificate.name}</p>
                     <Button
                        variant="outline"
                        disabled={loader.birthCertification}
                        onClick={() => handleUpload("birthCertificate")}
                        className="border border-[#02333F] text-[#02333F] flex items-center gap-2 px-4 py-2 rounded"
                     >
                        <Upload />
                        Upload
                        {loader.birthCertification && <Loader2 className="animate-spin" />}
                     </Button>
                  </div>
               )}
            </div>
            <div>
               <h1 className="text-[1rem] font-bold mb-[.3rem] mt-[1rem]">O-Level Results</h1>{" "}
               <p className="text-base text-gray-500">
                  Upload your O-Level results so we can check your qualifications.
               </p>
               <label
                  htmlFor="o-level-upload"
                  className="flex hover:border-black items-center justify-center block font-bold mb-2 border border-red rounded-[20px] h-[200px] cursor-pointer mt-[1rem]"
               >
                  O-Level Results
               </label>
               <input
                  type="file"
                  id="o-level-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "oLevelResults")}
                  className="block w-full mb-4 hidden"
               />
               {uploadStatus.oLevelResults && (
                  <div
                     className={`mb-4 ${
                        uploadStatus.oLevelResults.includes("Error")
                           ? "text-red-500"
                           : "text-green-500"
                     }`}
                  >
                     {uploadStatus.oLevelResults}
                  </div>
               )}
               {selectedOLevelResults && (
                  <div className="mb-4">
                     <p>Selected file: {selectedOLevelResults.name}</p>
                     <Button
                        disabled={loader.oLevel}
                        variant="outline"
                        onClick={() => handleUpload("oLevelResults")}
                        className="border border-[#02333F] text-[#02333F] flex items-center gap-2 px-4 py-2 rounded"
                     >
                        <Upload />
                        Upload
                        {loader.oLevel && <Loader2 className="animate-spin" />}
                     </Button>
                  </div>
               )}
               {uploadProgress.oLevelResults > 0 && uploadProgress.oLevelResults < 100 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                     <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress.oLevelResults}%` }}
                     ></div>
                  </div>
               )}
            </div>
         </div>
         <div className="flex gap-3">
            {stepLevel !== "0" && (
               <Button
                  className="text-[#02333F] bg-transparent hover:bg-[#02333f31] border border-[#02333F] py-[1.6rem] px-[2rem] font-bold"
                  type="button"
                  onClick={handlePrevious}
               >
                  Previous
               </Button>
            )}
            <Button
               className="bg-[#02333F] py-[1.6rem] px-[2rem] font-bold"
               type="submit"
               onClick={handleSaveInformation}
               // disabled={!isError || isSubmitting} // Disable the button if form is invalid or submitting
            >
               {" "}
               <Save />
               Save and Continue
            </Button>
         </div>
      </div>
   );
};

export default StepThree;
