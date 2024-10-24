import React from "react";
import { Toaster } from "react-hot-toast";
import { FaDotCircle } from "react-icons/fa";
import { FaArrowsRotate, FaEllipsisVertical } from "react-icons/fa6";

const rentalPostingMNG = () => {
  const transactions = [
    {
      name: "Wilson Rhiel Madsen",
      checkin_date: "08 Sep 2024 2:48 PM",
      checkout_date: "24/10/24",
      amount: "$66.00",
      status: "Send",
      statusColor: "bg-red-100 text-red-500",
      image: "https://placehold.co/32x32",
      postId: "Profile picture of Wilson Rhiel Madsen",
    },
    {
      name: "Adobe CC",
      checkin_date: "02 Sep 2024 11:54 AM",
      checkout_date: "24/10/24",
      amount: "$49.00",
      status: "Payment",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://placehold.co/32x32",
      postId: "Adobe CC logo",
    },
    {
      name: "Ashlynn Stanton",
      checkin_date: "30 Aug 2024 8:32 AM",
      checkout_date: "24/10/24",
      amount: "$580.00",
      status: "Received",
      statusColor: "bg-green-100 text-green-500",
      image: "https://placehold.co/32x32",
      postId: "Profile picture of Ashlynn Stanton",
    },
    {
      name: "Charlie Baptista",
      checkin_date: "27 Aug 2024 11:32 AM",
      checkout_date: "24/10/24",
      amount: "$45.00",
      status: "Send",
      statusColor: "bg-red-100 text-red-500",
      image: "https://placehold.co/32x32",
      postId: "Profile picture of Charlie Baptista",
    },
    {
      name: "Uber Taxi",
      checkin_date: "26 Aug 2024 6:56 PM",
      checkout_date: "24/10/24",
      amount: "$56.00",
      status: "Payment",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://placehold.co/32x32",
      postId: "Uber logo",
    },
    {
      name: "Uber Taxi",
      checkin_date: "26 Aug 2024 6:56 PM",
      checkout_date: "24/10/24",
      amount: "$56.00",
      status: "Payment",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://placehold.co/32x32",
      postId: "Uber logo",
    },
    {
      name: "Uber Taxi",
      checkin_date: "26 Aug 2024 6:56 PM",
      checkout_date: "24/10/24",
      amount: "$56.00",
      status: "Payment",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://placehold.co/32x32",
      postId: "Uber logo",
    },
    {
      name: "Uber Taxi",
      checkin_date: "26 Aug 2024 6:56 PM",
      checkout_date: "24/10/24",
      amount: "$56.00",
      status: "Payment",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://placehold.co/32x32",
      postId: "Uber logo",
    },
    {
      name: "Uber Taxi",
      checkin_date: "26 Aug 2024 6:56 PM",
      checkout_date: "24/10/24",
      amount: "$56.00",
      status: "Payment",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://placehold.co/32x32",
      postId: "Uber logo",
    },
    {
      name: "Uber Taxi",
      checkin_date: "26 Aug 2024 6:56 PM",
      checkout_date: "24/10/24",
      amount: "$56.00",
      status: "Payment",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://placehold.co/32x32",
      postId: "Uber logo",
    },
    {
      name: "Uber Taxi",
      checkin_date: "26 Aug 2024 6:56 PM",
      checkout_date: "24/10/24",
      amount: "$56.00",
      status: "Payment",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://placehold.co/32x32",
      postId: "Uber logo",
    },
  ];
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="flex items-center justify-between p-2 mt-3 mb-8">
          <h1 className="text-4xl font-bold">Danh sách yêu cầu</h1>
          <div className="flex items-center space-x-2">
            <button className="flex items-center bg-blue-500 text-white rounded-md px-4 py-2 ">
              <FaArrowsRotate className="mr-3" />
              Làm mới
            </button>
          </div>
        </div>{" "}
        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="p-4 text-left ml-3">Thông tin phòng</th>
              <th className="p-4 text-left">Ngày nhận phòng</th>
              <th className="p-4 text-left">Ngày trả phòng</th>
              <th className="p-4 text-left">Giá tiền</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4 flex items-center">
                  <img
                    src={transaction.image}
                    className="w-12 h-12 rounded-2xl mr-5"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{transaction.name}</h3>
                    <p className="text-sm text-blue-400">
                      {transaction.postId}
                    </p>
                  </div>
                </td>

                <td className="p-4">{transaction.checkin_date}</td>
                <td className="p-4">{transaction.checkout_date}</td>
                <td className="p-4">{transaction.amount}</td>
                <td className="p-4">
                  <span
                    className={`flex items-center px-2 py-1 rounded-full w-[100px] ${transaction.statusColor}`}
                  >
                    <FaDotCircle className="mr-2" />
                    {transaction.status}
                  </span>
                </td>
                <td className="p-4">
                  <FaEllipsisVertical />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
    </>
  );
};

export default rentalPostingMNG;
