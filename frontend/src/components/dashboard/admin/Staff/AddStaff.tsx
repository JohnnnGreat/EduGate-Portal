import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserPlus, Save, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

const staffSchema = z.object({
   // Personal Info
   firstName: z.string().min(2, "First name is required"),
   lastName: z.string().min(2, "Last name is required"),
   gender: z.enum(["Male", "Female", "Other"]),
   dateOfBirth: z.date(),
   photo: z.string().optional(),

   // Contact Info
   email: z.string().email("Invalid email address"),
   phone: z.string().min(10, "Phone number is required"),
   address: z.string().min(5, "Address is required"),

   // Emergency Contact
   emergencyContactName: z.string().optional(),
   emergencyContactPhone: z.string().optional(),
   emergencyContactRelationship: z.string().optional(),

   // Employment Details
   employeeID: z.string().min(3, "Employee ID is required"),
   department: z.string().min(2, "Department is required"),
   designation: z.string().min(2, "Designation is required"),
   employmentType: z.enum(["Full-Time", "Part-Time", "Contract"]),
   dateOfHire: z.date(),
   status: z.enum(["Active", "Inactive", "On Leave", "Retired"]),

   // Academic and Professional
   qualifications: z.array(z.string()).optional(),
   certifications: z.array(z.string()).optional(),
   previousExperience: z.array(z.string()).optional(),
});

export default function AddStaffForm() {
   const [qualifications, setQualifications] = useState([]);
   const [certifications, setCertifications] = useState([]);
   const [previousExperience, setPreviousExperience] = useState([]);

   const form = useForm({
      resolver: zodResolver(staffSchema),
      defaultValues: {
         firstName: "",
         lastName: "",
         gender: "Other",
         email: "",
         phone: "",
         address: "",
         employeeID: "",
         department: "",
         designation: "",
         employmentType: "Full-Time",
         status: "Active",
      },
   });

   const onSubmit = async (data) => {
      try {
         const response = await axios.post("/api/staff", {
            personalInfo: {
               firstName: data.firstName,
               lastName: data.lastName,
               gender: data.gender,
               dateOfBirth: data.dateOfBirth,
               photo: data.photo,
            },
            contactInfo: {
               email: data.email,
               phone: data.phone,
               address: data.address,
               emergencyContact: {
                  name: data.emergencyContactName,
                  phone: data.emergencyContactPhone,
                  relationship: data.emergencyContactRelationship,
               },
            },
            employmentDetails: {
               employeeID: data.employeeID,
               department: data.department,
               designation: data.designation,
               employmentType: data.employmentType,
               dateOfHire: data.dateOfHire,
               status: data.status,
            },
            academicAndProfessional: {
               qualifications: qualifications,
               certifications: certifications,
               previousExperience: previousExperience,
            },
         });

         toast.success("Staff member added successfully");
         form.reset();
         setQualifications([]);
         setCertifications([]);
         setPreviousExperience([]);
      } catch (error) {
         toast.error("Failed to add staff member");
         console.error(error);
      }
   };

   const addListItem = (setter) => (e) => {
      const value = e.target.value.trim();
      if (value) {
         setter((prev) => [...prev, value]);
         e.target.value = "";
      }
   };

   const removeListItem = (setter, index) => () => {
      setter((prev) => prev.filter((_, i) => i !== index));
   };

   return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
         <h2 className="text-2xl font-bold mb-6 flex items-center">
            <UserPlus className="mr-2" /> Add New Staff Member
         </h2>

         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-6"
            >
               {/* Personal Information */}
               <div className="grid grid-cols-2 gap-4">
                  <FormField
                     control={form.control}
                     name="firstName"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>First Name</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Enter first name"
                                 {...field}
                                 className="border bg-gray-300"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="lastName"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Last Name</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Enter last name"
                                 {...field}
                                 className="border bg-gray-300"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <FormField
                     control={form.control}
                     name="gender"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Gender</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger className="border bg-gray-300">
                                    <SelectValue placeholder="Select gender" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="Male">Male</SelectItem>
                                 <SelectItem value="Female">Female</SelectItem>
                                 <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="dateOfBirth"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>Date of Birth</FormLabel>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <FormControl>
                                    <Button
                                       variant={"outline"}
                                       className={cn("w-full pl-3 text-left font-normal border bg-gray-300", !field.value && "text-muted-foreground")}
                                    >
                                       {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                 </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                 className="w-auto p-0"
                                 align="start"
                              >
                                 <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                 />
                              </PopoverContent>
                           </Popover>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               {/* Contact Information */}
               <div className="grid grid-cols-2 gap-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 type="email"
                                 placeholder="Enter email"
                                 {...field}
                                 className="border bg-gray-300"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="phone"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Phone Number</FormLabel>
                           <FormControl>
                              <Input
                                 type="tel"
                                 placeholder="Enter phone number"
                                 {...field}
                                 className="border bg-gray-300"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Enter full address"
                              {...field}
                              className="border bg-gray-300"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               {/* Emergency Contact */}
               <div className="grid grid-cols-3 gap-4">
                  <FormField
                     control={form.control}
                     name="emergencyContactName"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Emergency Contact Name</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Enter name"
                                 {...field}
                                 className="border bg-gray-300"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="emergencyContactPhone"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Emergency Contact Phone</FormLabel>
                           <FormControl>
                              <Input
                                 type="tel"
                                 placeholder="Enter phone number"
                                 {...field}
                                 className="border bg-gray-300"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="emergencyContactRelationship"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Relationship</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Enter relationship"
                                 {...field}
                                 className="border bg-gray-300"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               {/* Employment Details */}
               <div className="grid grid-cols-2 gap-4">
                  <FormField
                     control={form.control}
                     name="employeeID"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Employee ID</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Enter employee ID"
                                 {...field}
                                 className="border bg-gray-300"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="department"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Department</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Enter department"
                                 {...field}
                                 className="border bg-gray-300"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <FormField
                     control={form.control}
                     name="designation"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Designation</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Enter designation"
                                 {...field}
                                 className="border bg-gray-300"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="employmentType"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Employment Type</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger className="border bg-gray-300">
                                    <SelectValue placeholder="Select employment type" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="Full-Time">Full-Time</SelectItem>
                                 <SelectItem value="Part-Time">Part-Time</SelectItem>
                                 <SelectItem value="Contract">Contract</SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <FormField
                     control={form.control}
                     name="dateOfHire"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>Date of Hire</FormLabel>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <FormControl>
                                    <Button
                                       variant={"outline"}
                                       className={cn("w-full pl-3 text-left font-normal border bg-gray-300", !field.value && "text-muted-foreground")}
                                    >
                                       {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                 </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                 className="w-auto p-0"
                                 align="start"
                              >
                                 <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date > new Date()}
                                    initialFocus
                                 />
                              </PopoverContent>
                           </Popover>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="status"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Employment Status</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger className="border bg-gray-300">
                                    <SelectValue placeholder="Select status" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="Active">Active</SelectItem>
                                 <SelectItem value="Inactive">Inactive</SelectItem>
                                 <SelectItem value="On Leave">On Leave</SelectItem>
                                 <SelectItem value="Retired">Retired</SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               {/* Dynamic Qualifications Section */}
               <div>
                  <FormLabel>Qualifications</FormLabel>
                  <div className="flex mb-2">
                     <Input
                        placeholder="Add qualification"
                        onKeyDown={(e) => e.key === "Enter" && addListItem(setQualifications)(e)}
                        className="border bg-gray-300 mr-2"
                     />
                  </div>
                  {qualifications.map((qual, index) => (
                     <div
                        key={index}
                        className="flex items-center bg-gray-100 p-2 rounded mb-1"
                     >
                        {qual}
                        <Button
                           type="button"
                           variant="destructive"
                           size="sm"
                           className="ml-2"
                           onClick={removeListItem(setQualifications, index)}
                        >
                           Remove
                        </Button>
                     </div>
                  ))}
               </div>

               {/* Dynamic Certifications Section */}
               <div>
                  <FormLabel>Certifications</FormLabel>
                  <div className="flex mb-2">
                     <Input
                        placeholder="Add certification"
                        onKeyDown={(e) => e.key === "Enter" && addListItem(setCertifications)(e)}
                        className="border bg-gray-300 mr-2"
                     />
                  </div>
                  {certifications.map((cert, index) => (
                     <div
                        key={index}
                        className="flex items-center bg-gray-100 p-2 rounded mb-1"
                     >
                        {cert}
                        <Button
                           type="button"
                           variant="destructive"
                           size="sm"
                           className="ml-2"
                           onClick={removeListItem(setCertifications, index)}
                        >
                           Remove
                        </Button>
                     </div>
                  ))}
               </div>

               {/* Dynamic Previous Experience Section */}
               <div>
                  <FormLabel>Previous Experience</FormLabel>
                  <div className="flex mb-2">
                     <Input
                        placeholder="Add previous job experience"
                        onKeyDown={(e) => e.key === "Enter" && addListItem(setPreviousExperience)(e)}
                        className="border bg-gray-300 mr-2"
                     />
                  </div>
                  {previousExperience.map((exp, index) => (
                     <div
                        key={index}
                        className="flex items-center bg-gray-100 p-2 rounded mb-1"
                     >
                        {exp}
                        <Button
                           type="button"
                           variant="destructive"
                           size="sm"
                           className="ml-2"
                           onClick={removeListItem(setPreviousExperience, index)}
                        >
                           Remove
                        </Button>
                     </div>
                  ))}
               </div>

               {/* Submit Button */}
               <Button
                  type="submit"
                  className="bg-[#02333F] py-4 px-[3rem] font-bold text-white flex gap-2 rounded-[10px] w-full mt-4"
               >
                  <Save /> Save Staff Member
               </Button>
            </form>
         </Form>
      </div>
   );
}
