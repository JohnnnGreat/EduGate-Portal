"use client";
import ContactSection from "@/components/dashboard/Support/ContactSection";
import Faqs from "@/components/dashboard/Support/Faqs";
import Ticket from "@/components/dashboard/Support/Ticket";
import TrackTicket from "@/components/dashboard/Support/TrackTicket";
import { useSearchParams } from "next/navigation";
import React from "react";

const SupportPage = () => {
   const stepLevel = useSearchParams().get("idx");

   if (stepLevel === "0") {
      return <Faqs />;
   }
   if (stepLevel === "1") {
      return <Ticket />;
   }
   if (stepLevel === "2") {
      return <ContactSection />;
   }
   if (stepLevel === "3") {
      return <TrackTicket />;
   }
};

export default SupportPage;
