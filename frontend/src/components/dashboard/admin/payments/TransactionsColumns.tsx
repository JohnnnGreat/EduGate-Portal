export const columns = [
   {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      align: "left",
   },
   {
      title: "Matric No",
      dataIndex: "matricNo",
      key: "matricNo",
      align: "center",
   },
   {
      title: "Payment Ref ID",
      dataIndex: "paymentRefID",
      key: "paymentRefID",
      align: "left",
      sorter: (a, b) => a.paymentRefID.localeCompare(b.paymentRefID), // Enable sorting by Payment Ref ID
   },
   {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      sorter: (a, b) => new Date(a.date) - new Date(b.date), // Sorting by Date
   },
   {
      title: "Amount (₦)",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      sorter: (a, b) =>
         parseFloat(a.amount.replace(/[₦,]/g, "")) - parseFloat(b.amount.replace(/[₦,]/g, "")), // Sorting by Amount
   },
   {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
   },
   {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
         <span
            style={{
               color: status === "Success" ? "green" : "red",
               fontWeight: "bold",
            }}
         >
            {status}
         </span>
      ),
   },
];
