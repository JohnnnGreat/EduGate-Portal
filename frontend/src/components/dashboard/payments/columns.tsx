import { ColumnDef } from "@tanstack/react-table";

// Payment interface definition
interface Payment {
   receiptNumber: string;
   paymentType: string;
   amount: number;
   status: string; // "Pending", "Success", "Failed"
   transactionDate: string;
}

// Status color map based on the enum values
const statusStyleMap: { [key: string]: string } = {
   Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
   Success: "bg-green-100 text-green-800 border-green-300",
   Failed: "bg-red-100 text-red-800 border-red-300",
};

const nairaFormatter = new Intl.NumberFormat("en-NG", {
   style: "currency",
   currency: "NGN",
});

// Columns definition
export const columns: ColumnDef<Payment>[] = [
   {
      accessorKey: "receiptNumber",
      header: "Receipt Number",
   },
   {
      accessorKey: "paymentType",
      header: "Payment Type",
   },
   {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
         // Format the amount to Naira format
         const formattedAmount = nairaFormatter.format(row.original.amount);
         return <span>{formattedAmount}</span>;
      },
   },
   {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
         const status = row.original.status;
         const styles = statusStyleMap[status] || "bg-gray-100 text-gray-800 border-gray-300";

         return (
            <div
               className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${styles}`}
            >
               {status}
            </div>
         );
      },
   },
   {
      accessorKey: "transactionDate",
      header: "Date",
      cell: ({ row }) => {
         const date = new Date(row.original.transactionDate).toLocaleDateString();
         return <span>{date}</span>;
      },
   },
];
