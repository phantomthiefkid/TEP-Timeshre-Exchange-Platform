import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

const UpdateCheckin = () => {
  const [status, setStatus] = useState("checked-in"); // default status

  // Define styles based on the selected status
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "checked-in":
        return "bg-green-100 text-green-700 border-green-300";
      case "checked-out":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="flex justify-end h-full">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex items-center p-4 border rounded-lg shadow-sm w-full mb-6">
        <img
          src="https://placehold.co/100x100"
          className="w-24 h-24 rounded-lg object-cover"
          alt="Room Thumbnail"
        />
        <div className="ml-4 flex-grow">
          <h2 className="text-lg font-medium">Mã đặt phòng</h2>
          <div className="flex items-center mt-4">
            <img
              src="https://placehold.co/40x40"
              className="w-10 h-10 rounded-full object-cover"
              alt="Customer Thumbnail"
            />
            <div className="ml-2">
              <p className="text-sm font-medium">Nguyễn Văn A</p>
              <p className="text-sm text-gray-500">0987654321</p>
            </div>
          </div>
        </div>

        <select className="rounded-3xl border border-gray-300 bg-gray-50 text-gray-700 p-3 hover:bg-gray-100 focus:border-blue-500 focus:outline-none transition ease-in-out duration-200">
          <option value="waiting">Đang chờ</option>
          <option value="checked-in" selected>
            Đã nhận phòng
          </option>
          <option value="checked-out">Đã trả phòng</option>
        </select>
      </div>
    </div>
  );
};

export default UpdateCheckin;
