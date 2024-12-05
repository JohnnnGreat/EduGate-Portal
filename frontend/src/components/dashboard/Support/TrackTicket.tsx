import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "@/components/form/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Ticket, TicketCheck, Calendar, Clock, User, AlertCircle } from "lucide-react";
import axiosUserClient from "@/lib/api/axiosClient";

// Ticket status color mapping
const STATUS_COLORS = {
   New: "bg-blue-100 text-blue-800",
   Open: "bg-yellow-100 text-yellow-800",
   InProgress: "bg-purple-100 text-purple-800",
   Resolved: "bg-green-100 text-green-800",
   Closed: "bg-gray-100 text-gray-800",
};

const ticketSchema = z.object({
   ticketId: z.string().min(2, { message: "Ticket ID must be higher than 2 characters." }),
});

const TrackTicket = () => {
   const form = useForm<z.infer<typeof ticketSchema>>({
      resolver: zodResolver(ticketSchema),
      defaultValues: {},
   });

   const [ticketData, setTicketData] = useState(null);
   const [error, setError] = useState(null);

   const TicketDetail = ({ icon: Icon, label, value }) => (
      <div className="flex items-center space-x-3 mb-2">
         <Icon className="text-gray-500 w-5 h-5" />
         <div>
            <span className="text-sm text-gray-600 mr-2">{label}:</span>
            <span className="font-medium">{value}</span>
         </div>
      </div>
   );

   const onSubmit = async (values: any) => {
      try {
         setError(null);
         const response = await axiosUserClient.get(`/tickets/ticket/${values.ticketId}`);
         setTicketData(response.data.ticket);
      } catch (err) {
         setError(err.response?.data?.error || "An unexpected error occurred");
         setTicketData(null);
      }
   };

   return (
      <>
         <div className=" rounded-lg p-[2rem]">
            <div className="mb-6">
               <h1 className="text-3xl font-bold text-gray-800 mb-3">Track Your Ticket</h1>
               <p className="text-gray-600">Enter your Ticket ID to check its status</p>
            </div>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  <TextField
                     label="Ticket ID"
                     name="ticketId"
                     form={form}
                     placeholder="Enter your ticket ID"
                     className="border-gray-300 focus:border-blue-500"
                  />

                  <Button
                     type="submit"
                     className="w-full bg-[#02333F] hover:bg-[#045669] py-3 text-white transition-colors"
                  >
                     <TicketCheck className="mr-2" /> Check Ticket Status
                  </Button>
               </form>
            </Form>

            {error && (
               <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
                  <AlertCircle className="mr-2 text-red-600" />
                  <p>{error}</p>
               </div>
            )}

            {ticketData && (
               <div className=" mx-auto my-8">
                  <div className="bg-white border-l-4 border-blue-600  rounded-lg overflow-hidden">
                     <div className="px-6 py-5 bg-gray-50 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                           <div>
                              <h2 className="text-xl font-semibold text-gray-800">Ticket #{ticketData.ticketId}</h2>
                              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[ticketData.status] || "bg-gray-100"}`}>{ticketData.status}</span>
                           </div>
                           <div className="text-right">
                              <p className="text-sm text-gray-500">Submission Date</p>
                              <p className="font-medium text-gray-700">
                                 {new Date(ticketData.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                 })}
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <p className="text-sm text-gray-500 mb-1">Submitted By</p>
                              <div className="flex items-center">
                                 <User className="mr-2 text-gray-400 w-5 h-5" />
                                 <span className="font-medium text-gray-800">{ticketData.submittedBy || "Unknown"}</span>
                              </div>
                           </div>
                           <div>
                              <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                              <div className="flex items-center">
                                 <Clock className="mr-2 text-gray-400 w-5 h-5" />
                                 <span className="font-medium text-gray-800">
                                    {new Date(ticketData.updatedAt).toLocaleDateString("en-US", {
                                       year: "numeric",
                                       month: "short",
                                       day: "numeric",
                                    })}
                                 </span>
                              </div>
                           </div>
                        </div>

                        <div>
                           <p className="text-sm text-gray-500 mb-2">Description</p>
                           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <p className="text-gray-700">{ticketData.description || "No description available"}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   );
};

export default TrackTicket;
