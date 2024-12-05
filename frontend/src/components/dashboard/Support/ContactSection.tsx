import React from "react";
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook } from "lucide-react";

const ContactSection = () => {
   return (
      <div className=" py-12 px-6 md:px-12">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                     <div className="flex items-start">
                        <MapPin className="mr-3 text-gray-500 mt-1" />
                        <div>
                           <p className="font-medium text-gray-700">Office Address</p>
                           <p className="text-gray-600">123 University Drive, Anytown USA</p>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <Phone className="mr-3 text-gray-500" />
                        <p className="font-medium text-gray-700">+234 800 123 4567</p>
                     </div>
                     <div className="flex items-center">
                        <Mail className="mr-3 text-gray-500" />
                        <p className="font-medium text-gray-700">support@edugate.edu.ng</p>
                     </div>
                  </div>
               </div>
               <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Social Media</h3>
                  <div className="space-y-4">
                     <div className="flex items-center">
                        <Instagram className="mr-3 text-gray-500" />
                        <p className="font-medium text-gray-700">@edugate_official</p>
                     </div>
                     <div className="flex items-center">
                        <Twitter className="mr-3 text-gray-500" />
                        <p className="font-medium text-gray-700">@edugate_official</p>
                     </div>
                     <div className="flex items-center">
                        <Facebook className="mr-3 text-gray-500" />
                        <p className="font-medium text-gray-700">Edugate University</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ContactSection;
