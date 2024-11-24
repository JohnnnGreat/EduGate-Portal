import Header from "@/components/dashboard/Header";
import { checkPayment } from "@/lib/api/transactions";
import React from "react";

const DashboardPage = async () => {

   return (
      <div>
         {" "}
         <Header />
      </div>
   );
};

export default DashboardPage;
