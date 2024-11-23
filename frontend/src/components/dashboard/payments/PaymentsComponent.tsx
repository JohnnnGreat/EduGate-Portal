import { useGetTransactionsByUser } from "@/hooks/useGetTransactionsByUser";
import React from "react";

const paymentsComponent = () => {
   const { response: transactions } = useGetTransactionsByUser();

   console.log(transactions);
   return (
      <div>
         <div>My Payments</div>
      </div>
   );
};

export default paymentsComponent;
