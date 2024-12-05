import { Button } from "@/components/ui/button";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "@/components/form/TextField";
import useUserData from "@/hooks/useUserData";
import useGetAdmission from "@/hooks/useGetAdmission";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { createTickets } from "@/lib/api/ticket";
import { toast } from "react-toastify";
import MyTickets from "./MyTickets";

const ticketSchema = z.object({
   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
   email: z.string(),
   matricNumber: z.string(),
   file: z.instanceof(File).optional(),
});

const Ticket = () => {
   const { data: response } = useUserData();
   const { data: admission } = useGetAdmission();
   const [uploadedFile, setUploadedFile] = useState<File | null>(null);

   const profileInformation = response?.data;

   const form = useForm<z.infer<typeof ticketSchema>>({
      resolver: zodResolver(ticketSchema),
      defaultValues: {},
   });

   // Populate form with user profile data if available
   useEffect(() => {
      if (profileInformation) {
         form.reset({
            email: profileInformation.email || "",
            name: `${profileInformation.firstName} ${profileInformation.lastName}`.trim(),
            matricNumber: admission?.data?.matNumber,
         });
      }
   }, [profileInformation, form, admission]);

   const [fileUrl, setfileUrl] = useState("");

   const onSubmit = async (values: any) => {
      if (uploadedFile) {
         // Upload File to Endpoint
         const formData = new FormData();

         formData.append("file", uploadedFile);

         const response = await axios.post("https://appwrite-express-file-upload.onrender.com/upload", formData);

         setfileUrl(response?.data?.fileUrl);
      }

      // Add the uploaded file to the values
      const submitData = {
         ...values,
         academicSession: admission?.data?.academicSession,
         file: fileUrl ? fileUrl : "",
      };

      const ticketResponse = await createTickets(submitData);
      console.log(ticketResponse);

      toast.success(ticketResponse.message);

      form.reset();
   };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         setUploadedFile(file);
         // Optional: You can add validation here
         form.setValue("file", file);
      }
   };

   return (
      <>
         <div className="p-6 ">
            <h1 className="text-3xl font-bold text-gray-800 mb-3 ">Raise a Support Ticket</h1>
            <p className="text-[#000]/50">Tell us about your issue, and our team will get back to you within 48 hours.</p>

            <div>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-4"
                  >
                     <TextField
                        label="Full Name"
                        name="name"
                        form={form}
                        defaultValue={`${profileInformation?.firstName} ${profileInformation?.lastName}`}
                        disabledField
                        className="border bg-gray-300"
                     />
                     <div className="grid grid-cols-2 gap-[1rem]">
                        <TextField
                           label="Matric Number"
                           name="matricNumber"
                           form={form}
                           disabledField
                           className="border bg-gray-300"
                        />
                        <TextField
                           label="Email"
                           name="email"
                           form={form}
                           defaultValue={profileInformation?.email}
                           disabledField
                           className="border bg-gray-300"
                        />
                     </div>

                     <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="mt-3">Upload Document (optional)</FormLabel>
                              <FormControl>
                                 <Input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="bg-white py-[1.6rem] flex items-center mt-[0!important] shadow-none px-[1rem] outline-none"
                                 />
                              </FormControl>
                              {uploadedFile && <div className="text-sm text-gray-600 mt-2">Uploaded: {uploadedFile.name}</div>}
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div className="flex gap-4">
                        <Button
                           type="submit"
                           className="bg-[#02333F] py-4 px-8"
                        >
                           Save and Continue
                        </Button>
                     </div>
                  </form>
               </Form>
            </div>
         </div>

         <MyTickets />
      </>
   );
};

export default Ticket;
