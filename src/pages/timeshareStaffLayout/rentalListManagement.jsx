import React from "react";
import { Toaster } from "react-hot-toast";
const RentalListManagement = () => {
  const transactions = [
    {
      name: "Wilson Rhiel Madsen",
      date: "08 Sep 2024 2:48 PM",
      type: "Transfer",
      amount: "$66.00",
      status: "Send",
      statusColor: "bg-red-100 text-red-500",
      image: "https://placehold.co/32x32",
      alt: "Profile picture of Wilson Rhiel Madsen",
    },
    {
      name: "Adobe CC",
      date: "02 Sep 2024 11:54 AM",
      type: "Subscription",
      amount: "$49.00",
      status: "Payment",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://placehold.co/32x32",
      alt: "Adobe CC logo",
    },
    {
      name: "Ashlynn Stanton",
      date: "30 Aug 2024 8:32 AM",
      type: "Request",
      amount: "$580.00",
      status: "Received",
      statusColor: "bg-green-100 text-green-500",
      image: "https://placehold.co/32x32",
      alt: "Profile picture of Ashlynn Stanton",
    },
    {
      name: "Charlie Baptista",
      date: "27 Aug 2024 11:32 AM",
      type: "Transfer",
      amount: "$45.00",
      status: "Send",
      statusColor: "bg-red-100 text-red-500",
      image: "https://placehold.co/32x32",
      alt: "Profile picture of Charlie Baptista",
    },
    {
      name: "Uber Taxi",
      date: "26 Aug 2024 6:56 PM",
      type: "Transport",
      amount: "$56.00",
      status: "Payment",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://placehold.co/32x32",
      alt: "Uber logo",
    },
  ];
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="p-4 text-left">
                <input type="checkbox" />
              </th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4 flex items-center">
                  <img
                    src={transaction.image}
                    alt={transaction.alt}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {transaction.name}
                </td>
                <td className="p-4">{transaction.date}</td>
                <td className="p-4">{transaction.type}</td>
                <td className="p-4">{transaction.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${transaction.statusColor}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="p-4">
                  <i className="fas fa-ellipsis-h"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
    </>
  );
};

export default RentalListManagement;
