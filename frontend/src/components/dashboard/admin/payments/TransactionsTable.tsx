"use client";
import useGetAllPaymentTransactions from "@/hooks/useGetAllPaymentTransactions";
import React from "react";
import { Table } from "antd";
import { columns } from "./TransactionsColumns";

const TransactionsTable = () => {
   const { data: transactions } = useGetAllPaymentTransactions();

   const dataSource = transactions?.payments?.map((payment) => ({
      key: payment._id,
      name: `${payment.studentId.firstName} ${payment.studentId.lastName}`,
      matricNo: payment.studentId.admissionNumber,
      paymentRefID: payment.reference,
      date: new Date(payment.transactionDate).toLocaleDateString(),
      amount: `₦${payment.amount.toLocaleString()}`,
      type: payment.paymentType,
      status: payment.status,
   }));
   return (
      <div className=" mx-auto mt-[1rem] pb-[5rem]">
         <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            size="middle"
            pagination={{ pageSize: 5 }}
            className="custom-table"
         />
      </div>
   );
};

export default TransactionsTable;
