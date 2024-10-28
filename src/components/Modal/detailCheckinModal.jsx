import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaDotCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import UpdateCheckin from "../../pages/timeshareStaffLayout/updateCheckin/updateCheckin";

const DetailCheckinModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const modalStyles = isOpen
    ? {}
    : {
        opacity: 0,
        transform: "translateX(100%)",
        transition: "all 0.3s ease",
      };

  return (
    <div className="fixed inset-0 flex justify-end p-3 h-full">
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl flex flex-col"
        style={{ zIndex: 1000, ...modalStyles }}
      >
        <h2 className="text-2xl font-semibold mb-8">Thông tin chi tiết</h2>

        <button
          onClick={onClose}
          className="absolute top-7 right-7 text-gray-500 hover:text-zinc-300 focus:outline-none"
        >
          <FaXmark size={28} />
        </button>

        {/* UpdateCheckin Component placed here */}
        <div className="mb-0 ">
          <UpdateCheckin />
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-5">Chi tiết cho thuê</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Loại phòng</span>
              <span>Tên loại phòng</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Ngày nhận phòng</span>
              <span>20 Sep 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Ngày trả phòng</span>
              <span>20 Sep 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Số đêm</span>
              <span>02</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Giá phòng</span>
              <span>200,000</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Trạng thái</span>
              <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-xl">
                <FaDotCircle className="mr-3" color="green" />
                <span>Đã nhận phòng</span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-5">Thông tin khách hàng</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Tên khách hàng</span>
              <span>Tên khách hàng</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="font-medium">Thông tin liên lạc</span>
              <div className="flex flex-col items-end">
                <span className="mb-3">sđt</span>
                <span>mail</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex justify-end mt-5">
          <button
            className="bg-blue-500 text-white border border-blue-500 hover:bg-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-300 transition-all duration-300 ease-in-out mr-4 px-4 py-2 rounded"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCheckinModal;
