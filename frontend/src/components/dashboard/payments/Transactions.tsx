import React from "react";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const Transactions = ({ trxs }) => {
   const dataT = trxs?.payments;

   return (
      <DataTable
         columns={columns}
         data={dataT ?? []}
      />
   );
};

export default Transactions;
