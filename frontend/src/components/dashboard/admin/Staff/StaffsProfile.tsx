"use client";
import React, { useState, useEffect } from "react";
import { UserCircle, Mail, Phone, MapPin, Briefcase, Award, Calendar, Clock } from "lucide-react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { axiosAdminClient } from "@/lib/api/axiosClient";

export default function StaffProfileComponent({ staffId }) {
   const [staff, setStaff] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchStaffDetails = async () => {
         try {
            const response = await axiosAdminClient.get(`/staff/6751be03069f2024c007f323`);

            console.log(response.data);
            setStaff(response.data);
            setLoading(false);
         } catch (error) {
            console.error("Error fetching staff details:", error);
            setLoading(false);
         }
      };

      fetchStaffDetails();
   }, [staffId]);

   if (loading) return <div>Loading...</div>;
   if (!staff) return <div>Staff not found</div>;

   return (
      <div className="container mx-auto p-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Overview */}
            <Card className="md:col-span-1">
               <CardHeader className="items-center">
                  <UserCircle
                     size={100}
                     className="text-gray-500"
                  />
                  <h2 className="text-2xl font-bold mt-4">
                     {staff.personalInfo.firstName} {staff.personalInfo.lastName}
                  </h2>
                  <p className="text-muted-foreground">{staff.employmentDetails.designation}</p>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     <div className="flex items-center">
                        <Mail className="mr-2 text-gray-500" />
                        <span>{staff.contactInfo.email}</span>
                     </div>
                     <div className="flex items-center">
                        <Phone className="mr-2 text-gray-500" />
                        <span>{staff.contactInfo.phone}</span>
                     </div>
                     <div className="flex items-center">
                        <MapPin className="mr-2 text-gray-500" />
                        <span>{staff.contactInfo.address}</span>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Detailed Information */}
            <Card className="md:col-span-2">
               <Tabs defaultValue="employment">
                  <TabsList className="grid w-full grid-cols-3">
                     <TabsTrigger value="employment">Employment</TabsTrigger>
                     <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                     <TabsTrigger value="performance">Performance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="employment">
                     <CardHeader>
                        <CardTitle>Employment Details</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="flex items-center">
                              <Briefcase className="mr-2 text-gray-500" />
                              <span>Employee ID: {staff.employmentDetails.employeeID}</span>
                           </div>
                           <div className="flex items-center">
                              <Briefcase className="mr-2 text-gray-500" />
                              <span>Department: {staff.employmentDetails.department}</span>
                           </div>
                           <div className="flex items-center">
                              <Clock className="mr-2 text-gray-500" />
                              <span>Employment Type: {staff.employmentDetails.employmentType}</span>
                           </div>
                           <div className="flex items-center">
                              <Calendar className="mr-2 text-gray-500" />
                              <span>Hire Date: {new Date(staff.employmentDetails.dateOfHire).toLocaleDateString()}</span>
                           </div>
                        </div>
                     </CardContent>
                  </TabsContent>

                  <TabsContent value="qualifications">
                     <CardHeader>
                        <CardTitle>Academic & Professional</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div>
                           <h3 className="font-semibold mb-2">Qualifications</h3>
                           <ul className="list-disc pl-5">
                              {staff.academicAndProfessional.qualifications?.map((qual, index) => (
                                 <li key={index}>{qual}</li>
                              ))}
                           </ul>
                        </div>
                        <div className="mt-4">
                           <h3 className="font-semibold mb-2">Certifications</h3>
                           <ul className="list-disc pl-5">
                              {staff.academicAndProfessional.certifications?.map((cert, index) => (
                                 <li key={index}>{cert}</li>
                              ))}
                           </ul>
                        </div>
                     </CardContent>
                  </TabsContent>

                  <TabsContent value="performance">
                     <CardHeader>
                        <CardTitle>Performance History</CardTitle>
                     </CardHeader>
                     {/* <CardContent>
                        {staff.performance.evaluations?.map((eval, index) => (
                           <div
                              key={index}
                              className="mb-4 p-3 bg-gray-100 rounded"
                           >
                              <div className="flex justify-between">
                                 <span className="font-semibold">
                                    <Calendar className="inline mr-2 text-gray-500" />
                                    {new Date(eval.date).toLocaleDateString()}
                                 </span>
                                 <span>Score: {eval.score}/100</span>
                              </div>
                              <p className="mt-2">{eval.comments}</p>
                           </div>
                        ))}
                     </CardContent> */}
                  </TabsContent>
               </Tabs>
            </Card>
         </div>
      </div>
   );
}
