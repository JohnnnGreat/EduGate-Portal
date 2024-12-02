exports.generatePaymentReport = (totalAmount, paidStudents, paymentType) => {
   const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }

          .container {
            max-width: 900px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          h1 {
            font-size: 28px;
            color: #333;
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
          }

          h2 {
            font-size: 22px;
            color: #333;
            margin-bottom: 15px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
          }

          p {
            font-size: 18px;
            color: #555;
            margin-bottom: 20px;
          }

          .student-list {
            list-style-type: none;
            padding: 0;
          }

          .student-item {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #fafafa;
            border-left: 4px solid #4CAF50;
          }

          .student-item strong {
            color: #333;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          table th, table td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
          }

          table th {
            background-color: #4CAF50;
            color: #fff;
            font-size: 16px;
          }

          table td {
            font-size: 16px;
            color: #333;
          }

          .total-summary {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
            text-align: right;
          }

          .footer {
            font-size: 14px;
            color: #777;
            text-align: center;
            margin-top: 40px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Payment Report for Paid Students</h1>

          <p><strong>Total Amount Collected: </strong>₦${totalAmount}</p>

          <h2>List of Paid Students</h2>
          <ul class="student-list">
            ${paidStudents
               .map(
                  (student) => `
                <li class="student-item">
                  <strong>${student.firstName} ${student.lastName}</strong><br>
                  <strong>Matriculation No:</strong> ${student.matNo}<br>
                  <strong>Faculty:</strong> ${student.faculty}<br>
                  <strong>Department:</strong> ${student.department}
                </li>
              `,
               )
               .join("")}
          </ul>

          <h2>Payment Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Payment Type</th>
                <th>Total Amount</th>
                <th>Paid By</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(paymentType)
                 .map(
                    ([paymentTypeName, details]) => `
                    <tr>
                      <td>${paymentTypeName}</td>
                      <td>₦${details.total}</td>
                      ${details.paidBy.map(
                         (by) => `
                        <td>
                          ${by.matNo}
                        </td>
                      `,
                      )}
                      
                    </tr>
                  `,
                 )
                 .join("")}
            </tbody>
          </table>

          <div class="total-summary">
            <p><strong>Total Amount Collected: </strong>₦${totalAmount}</p>
          </div>

          <div class="footer">
            <p>Report generated on ${new Date().toLocaleDateString()}</p>
            <p>&copy; ${new Date().getFullYear()} Payment Management System</p>
          </div>
        </div>
      </body>
    </html>
  `;

   return htmlContent;
};
