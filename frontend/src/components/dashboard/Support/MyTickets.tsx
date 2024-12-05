import React, { useState, useEffect } from "react";
import axios from "axios";
import { MoreVertical, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import axiosUserClient from "@/lib/api/axiosClient";
import { Ticket } from "@/types";

const TicketStatusIcon: React.FC<{ status: string }> = ({ status }) => {
   const statusIcons = {
      Open: <AlertTriangle className="text-yellow-500 w-5 h-5" />,
      "In Progress": <Clock className="text-blue-500 w-5 h-5" />,
      Resolved: <CheckCircle className="text-green-500 w-5 h-5" />,
      Closed: <FileText className="text-gray-500 w-5 h-5" />,
   };

   return statusIcons[status] || <AlertTriangle className="text-gray-500 w-5 h-5" />;
};

const ProfessionalTicketView: React.FC = () => {
   const [tickets, setTickets] = useState<Ticket[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchTickets = async () => {
         try {
            const response = await axiosUserClient.get<{ tickets: Ticket[] }>("/tickets/my-tickets");
            setTickets(response.data.tickets);
            setLoading(false);
         } catch (err) {
            setError("Failed to fetch tickets");
            setLoading(false);
         }
      };

      fetchTickets();
   }, []);

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
               <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">{error}</div>
            </div>
         </div>
      );
   }

   return (
      <div className=" py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto">
            <div className="bg-white  rounded-2xl overflow-hidden">
               <div className="px-6 py-8 sm:px-10 bg-gradient-to-r from-blue-500 to-purple-600">
                  <div className="flex items-center justify-between">
                     <h1 className="text-2xl font-bold text-white">My Support Tickets</h1>
                     <div className="flex items-center space-x-3">
                        <button className="bg-white/20 text-white rounded-full p-2 hover:bg-white/30 transition">
                           <MoreVertical className="w-5 h-5" />
                        </button>
                     </div>
                  </div>
               </div>

               {tickets.length === 0 ? (
                  <div className="p-10 text-center bg-gray-100">
                     <p className="text-gray-600 text-lg">No support tickets found</p>
                  </div>
               ) : (
                  <div className="divide-y divide-gray-200">
                     {tickets.map((ticket) => (
                        <div
                           key={ticket._id}
                           className="px-6 py-4 hover:bg-gray-50 transition duration-150 ease-in-out"
                        >
                           <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                 <TicketStatusIcon status={ticket.status || "Open"} />
                                 <div>
                                    <div className="flex items-center space-x-2">
                                       <h3 className="text-lg font-semibold text-gray-900">{ticket.ticketId}</h3>
                                       <span
                                          className={`
                              px-2 py-0.5 rounded-full text-xs font-medium
                              ${ticket.status === "Open" ? "bg-yellow-100 text-yellow-800" : ticket.status === "In Progress" ? "bg-blue-100 text-blue-800" : ticket.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                            `}
                                       >
                                          {ticket.status || "Open"}
                                       </span>
                                    </div>
                                    <p className="text-sm text-gray-500 max-w-md truncate">{ticket.issueDescription || "No description provided"}</p>
                                 </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                 <span className="text-sm text-gray-500 flex items-center">
                                    <Clock className="mr-2 w-4 h-4 text-gray-400" />
                                    {new Date(ticket.createdAt).toLocaleDateString()}
                                 </span>
                                 <button
                                    className="
                          bg-blue-50 text-blue-600 
                          hover:bg-blue-100 
                          px-3 py-1.5 
                          rounded-md 
                          text-sm 
                          transition
                          focus:outline-none 
                          focus:ring-2 
                          focus:ring-blue-300
                        "
                                 >
                                    View Details
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ProfessionalTicketView;
