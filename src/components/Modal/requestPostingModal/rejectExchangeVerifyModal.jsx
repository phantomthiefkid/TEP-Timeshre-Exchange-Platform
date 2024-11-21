import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const rejectExchangeVerifyModal = ({ isOpen, onClose, onReject }) => {
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
      className="fixed inset-0 flex justify-center items-center"
      style={{ zIndex: 10000 }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-4 shadow-lg z-50 w-1/3">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-2">Lý do từ chối</h2>
          <div
            onClick={onClose}
            className="text-gray-500 hover:text-zinc-300 focus:outline-none"
          >
            <FaXmark size={24} />
          </div>
        </div>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Vui lòng nhập lí do từ chối bài đăng..."
          rows={7}
          className="w-full border border-gray-300 rounded-lg p-2 mt-3"
          style={{ resize: "none" }}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 border border-gray-400 px-4 py-2 rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Từ chối
          </button>
        </div>
      </div>
    </div>
  );
};

export default rejectExchangeVerifyModal;
