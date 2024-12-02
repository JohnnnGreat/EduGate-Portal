import React from "react";

// The PaymentReport component accepts props for totalAmount, paidStudents, and paymentType
const PaymentReport = ({ totalAmount, paidStudents, paymentType }) => {
   return (
      <div className=" p-6 bg-white rounded-lg ">
         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 border-b-4 border-green-500 pb-4">
            Payment Report for Paid Students
         </h1>

         <p className="text-lg text-gray-600 mb-6">
            <strong>Total Amount Collected: </strong>₦{totalAmount}
         </p>

         <h2 className="text-2xl font-semibold text-gray-800 mb-4">List of Paid Students</h2>
         <ul className="space-y-4">
            {paidStudents.map((student, index) => (
               <li
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
               >
                  <strong className="text-xl text-gray-800">
                     {student.firstName} {student.lastName}
                  </strong>
                  <br />
                  <span className="text-gray-600">
                     <strong>Matric No:</strong> {student.matNo}
                  </span>
                  <br />
                  <span className="text-gray-600">
                     <strong>Faculty:</strong> {student.faculty}
                  </span>
                  <br />
                  <span className="text-gray-600">
                     <strong>Department:</strong> {student.department}
                  </span>
               </li>
            ))}
         </ul>

         <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Payment Breakdown</h2>
         <table className="min-w-full table-auto border-collapse">
            <thead>
               <tr className="bg-green-500 text-white">
                  <th className="px-6 py-3 text-left">Payment Type</th>
                  <th className="px-6 py-3 text-left">Total Amount</th>
                  <th className="px-6 py-3 text-left">Paid By</th>
               </tr>
            </thead>
            <tbody>
               {Object.entries(paymentType).map(([paymentTypeName, details], index) => (
                  <tr
                     key={index}
                     className="border-b hover:bg-gray-100"
                  >
                     <td className="px-6 py-4">{paymentTypeName}</td>
                     <td className="px-6 py-4">₦{details.total}</td>
                     <td className="px-6 py-4">{details.paidBy.join(", ")}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <div className="text-right mt-6">
            <p className="font-semibold text-lg text-gray-800">
               <strong>Total Amount Collected: </strong>₦{totalAmount}
            </p>
         </div>

         <div className="text-center text-sm text-gray-600 mt-8">
            <p>Report generated on {new Date().toLocaleDateString()}</p>
            <p>&copy; {new Date().getFullYear()} Payment Management System</p>
         </div>
      </div>
   );
};

export default PaymentReport;
