import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaArrowsRotate, FaEllipsisVertical } from "react-icons/fa6";
import DetailCheckinModal from "../../components/Modal/detailCheckinModal";
const RentalListManagement = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedDateTab, setSelectedDateTab] = useState("today");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const transactions = [
    {
      name: "Wilson Rhiel Madsen",
      contact: "text",
      room_type: "Type1 ",
      number_of_nights: "02 ",
      status: "Đã nhận phòng",
      statusColor: "bg-green-100 text-green-500",
      image: "https://placehold.co/32x32",
      date: new Date(Date.now() - 86400000), // Yesterday
    },
    {
      name: "Adobe CC",
      contact: "text",
      room_type: "Type3",
      number_of_nights: "02 ",
      status: "Đã trả phòng",
      statusColor: "bg-red-100 text-red-500",
      image: "https://placehold.co/32x32",
      date: new Date(), // Today
    },
    {
      name: "Wilson Rhiel Madsen",
      contact: "text",
      room_type: "Type1",
      number_of_nights: "02",
      status: "Đã nhận phòng",
      statusColor: "bg-green-100 text-green-500",
      image: "https://placehold.co/32x32",
      date: new Date(), // Today
    },
    {
      name: "Adobe CC",
      contact: "text",
      room_type: "Type3",
      number_of_nights: "02",
      status: "Đã trả phòng",
      statusColor: "bg-red-100 text-red-500",
      image: "https://placehold.co/32x32",
      date: new Date(Date.now() - 86400000), // Yesterday
    },
    {
      name: "Another Guest",
      contact: "text",
      room_type: "Type2",
      number_of_nights: "03",
      status: "Đang chờ",
      statusColor: "bg-yellow-100 text-yellow-500",
      image: "https://placehold.co/32x32",
      date: new Date(Date.now() + 86400000), // Tomorrow
    },
  ];

  // Enhanced filtering logic
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by status
    const statusMatches =
      !filterStatus ||
      transaction.status.toLowerCase().includes(filterStatus.toLowerCase());

    // Filter by date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const transactionDate = new Date(transaction.date);
    transactionDate.setHours(0, 0, 0, 0);

    let dateMatches = false;
    switch (selectedDateTab) {
      case "yesterday":
        dateMatches =
          transactionDate.getTime() ===
          new Date(today.getTime() - 86400000).getTime();
        break;
      case "today":
        dateMatches = transactionDate.getTime() === today.getTime();
        break;
      case "tomorrow":
        dateMatches =
          transactionDate.getTime() ===
          new Date(today.getTime() + 86400000).getTime();
        break;
      default:
        dateMatches = true;
    }

    return statusMatches && dateMatches;
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="flex items-center justify-between p-2 mt-3">
          <div className="mb-6">
            <h1 className="text-4xl font-bold">Danh sách thuê</h1>
            <h3 className="text-xl text-gray-500">
              Quản lí các yêu cầu thuê của khách hàng.
            </h3>
          </div>
        </div>

        {/* Dashboard */}
        <div className="flex justify-center items-center bg-white mb-3">
          {/* Nhận phòng */}
          <div className="flex flex-col justify-center w-[480px] h-32 bg-white shadow-md rounded-lg p-4 m-4">
            <div className="flex items-center justify-between w-full">
              <div className="text-4xl font-bold text-green-600">03</div>
              <div className="text-3xl">
                <FaCalendarCheck />
              </div>
            </div>
            <div className="text-xl font-semibold mt-4 text-left">
              Nhận phòng
            </div>
          </div>

          {/* Trả phòng */}
          <div className="flex flex-col justify-center w-[480px] h-32 bg-white shadow-md rounded-lg p-4 m-4">
            <div className="flex items-center justify-between w-full">
              <div className="text-4xl font-bold text-red-600">02</div>
              <div className="text-3xl">
                <FaSignOutAlt />
              </div>
            </div>
            <div className="text-xl font-semibold mt-4 text-left">
              Trả phòng
            </div>
          </div>

          {/* Đang chờ */}
          <div className="flex flex-col justify-center w-[480px] h-32 bg-white shadow-md rounded-lg p-4 m-4">
            <div className="flex items-center justify-between w-full">
              <div className="text-4xl font-bold text-yellow-600">12</div>
              <div className="text-3xl">
                <FaCalendarAlt />
              </div>
            </div>
            <div className="text-xl font-semibold mt-4 text-left">Đang chờ</div>
          </div>
        </div>

        {/* Filter Buttons & Refresh Button */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-1">
            {/* All Filter */}
            <button
              onClick={() => setFilterStatus("")} // Reset filter
              className={`px-4 py-2 rounded-md ${
                filterStatus === ""
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Tất cả
            </button>

            {/* Custom Status Filters */}
            <button
              onClick={() => setFilterStatus("Đang chờ")}
              className={`px-4 py-2 rounded-md ${
                filterStatus === "Đang chờ"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Đang chờ
            </button>

            <button
              onClick={() => setFilterStatus("Đã nhận phòng")}
              className={`px-4 py-2 rounded-md ${
                filterStatus === "Đã nhận phòng"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Đã nhận phòng
            </button>

            <button
              onClick={() => setFilterStatus("Đã trả phòng")}
              className={`px-4 py-2 rounded-md ${
                filterStatus === "Đã trả phòng"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Đã trả phòng
            </button>
          </div>

          {/* Refresh Button */}
          <button className="flex items-center bg-blue-500 text-white rounded-md px-4 py-2">
            <FaArrowsRotate className="mr-3" />
            Làm mới
          </button>
        </div>

        {/* Day Fitler */}
        <div className="flex justify-start space-x-2 mb-1">
          <button
            className={`px-4 py-2 text-black bg-white transition-all duration-300 ease-out relative ${
              selectedDateTab === "yesterday" ? "text-blue-500 bg-blue-500" : ""
            }`}
            onClick={() => setSelectedDateTab("yesterday")}
          >
            Hôm qua
            {selectedDateTab === "yesterday" && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 mt-1"></span>
            )}
          </button>
          <button
            className={`px-4 py-2 text-black bg-white transition-all duration-300 ease-out relative ${
              selectedDateTab === "today" ? "text-blue-500 bg-blue-500" : ""
            }`}
            onClick={() => setSelectedDateTab("today")}
          >
            Hôm nay
            {selectedDateTab === "today" && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 mt-1"></span>
            )}
          </button>
          <button
            className={`px-4 py-2 text-black bg-white transition-all duration-300 ease-out relative ${
              selectedDateTab === "tomorrow" ? "text-blue-500 bg-blue-500" : ""
            }`}
            onClick={() => setSelectedDateTab("tomorrow")}
          >
            Ngày mai
            {selectedDateTab === "tomorrow" && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 mt-1"></span>
            )}
          </button>
        </div>
        {/* Transactions Table */}
        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="p-4 text-left ml-3">Thông tin khách hàng</th>
              <th className="p-4 text-left">Loại phòng</th>
              <th className="p-4 text-left">Số đêm</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-center ">Check in/out</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4 flex items-center w-72">
                  <img
                    src={transaction.image}
                    className="w-12 h-12 rounded-2xl mr-5"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{transaction.name}</h3>
                    <p className="text-sm text-blue-400">
                      {transaction.contact}
                    </p>
                  </div>
                </td>
                <td className="p-4">{transaction.room_type}</td>
                <td className="p-4 pl-8">{transaction.number_of_nights}</td>
                <td className="p-4">
                  <span
                    className={`flex items-center justify-center px-2 py-1 rounded-full w-36 font-semibold ${transaction.statusColor}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="p-4">
                  {transaction.status ===
                  "Đang chờ" ? null : transaction.status === "Đã nhận phòng" ? (
                    <div className="flex justify-evenly">
                      <img
                        src="../src/assets/checkin.png"
                        alt="Check-in"
                        className="w-6 h-6"
                      />
                    </div>
                  ) : transaction.status === "Đã trả phòng" ? (
                    <div className="flex justify-evenly items-center">
                      <img
                        src="../src/assets/checkin.png"
                        alt="Check-in"
                        className="w-6 h-6 mr-2"
                      />
                      <img
                        src="../src/assets/checkout.png"
                        alt="Check-out"
                        className="w-6 h-6"
                      />
                    </div>
                  ) : null}
                </td>
                <td className="p-4">
                  <div
                    className="cursor-pointer hover:bg-gray-100 rounded-xl w-8 h-8 p-2"
                    onClick={() => {
                      handleOpenDetailModal();
                    }}
                  >
                    <FaEllipsisVertical />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-5 w-full">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-500">
            <FaChevronLeft />
          </button>
          <div className="flex space-x-2 bg-gray-200 rounded-full px-2 py-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
              4
            </button>
            <span className="flex items-center justify-center text-gray-500">
              ...
            </span>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
              37
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
              38
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
              39
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
              40
            </button>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
            <FaChevronRight />
          </button>
        </div>

        <DetailCheckinModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      </div>
    </>
  );
};

export default RentalListManagement;
