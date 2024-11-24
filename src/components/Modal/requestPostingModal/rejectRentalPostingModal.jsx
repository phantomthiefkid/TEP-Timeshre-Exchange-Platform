import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const RejectRentalPostingModal = ({ isOpen, onClose, onReject }) => {
  const [reason, setReason] = useState("");

  const handleReject = () => {
    if (reason.trim()) {
      onReject(reason);
      onClose();
    } else {
      toast.error("Vui lòng nhập lí do từ chối.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
      style={{ zIndex: 10000 }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaXmark size={24} />
        </button>

        <div className="flex justify-center mb-4">
          <img
            src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986300333_logoTEPblack.png"
            alt="System Logo"
            className="h-16 w-auto"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Lý do từ chối
        </h2>
        <p className="text-gray-600 mb-6">
          Vui lòng nhập lý do từ chối dưới đây.
        </p>

        <div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none h-44"
            placeholder="Vui lòng nhập lí do từ chối bài đăng..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleReject}
            className="bg-red-500 px-6 py-2 rounded-lg text-white focus:outline-none hover:bg-red-600"
            disabled={!reason.trim()}
          >
            Từ chối
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectRentalPostingModal;
