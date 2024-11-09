import React, { useState } from "react";
import { FaAddressCard, FaLocationDot, FaUser, FaXmark } from "react-icons/fa6";
import SpinnerWaiting from "../LoadingComponent/spinnerWaiting";

const DetailTimeshareCompanyModal = ({ isOpen, onClose, company }) => {
  const [isActive, setIsActive] = useState(company?.isActive || false); // Track the toggle status

  if (!isOpen) return null;

  // Function to handle the toggle switch
  const handleToggle = () => {
    setIsActive(!isActive); // Toggle the active state
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
        style={{ zIndex: 1000 }}
      >
        <h2 className="text-2xl font-semibold mb-8">Thông tin chi tiết</h2>
        <button
          onClick={onClose}
          className="absolute top-[22%] right-[34%] text-gray-500 hover:text-red-500 focus:outline-none"
        >
          <FaXmark size={24} />
        </button>
        {company ? (
          <div>
            <div className="flex items-center mb-5">
              <img
                src={company.logo}
                alt="Company logo"
                className="w-12 h-12 rounded-full mr-9"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {company.timeshareCompanyName}
                </h2>
                <p className="text-gray-500">{company.contact}</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tên đối tác</label>
              <div className="flex items-center border rounded-lg p-2">
                <FaUser className="mr-2" />
                <input
                  type="text"
                  value={company.timeshareCompanyName}
                  className="w-full outline-none"
                  readOnly
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Địa chỉ</label>
              <div className="flex items-center border rounded-lg p-2">
                <FaLocationDot className="mr-2" />
                <input
                  type="text"
                  value={company.address}
                  className="w-full outline-none"
                  readOnly
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Thông tin liên lạc
              </label>
              <div className="flex items-center border rounded-lg p-2">
                <FaAddressCard className="mr-2" />
                <input
                  type="text"
                  value={company.contact}
                  className="w-full outline-none"
                  readOnly
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Trạng thái</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={handleToggle} // Handle the toggle change
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-500">
                  <div
                    className={`absolute top-0.5 start-[2px] h-5 w-5 bg-white rounded-full transition-all ${
                      isActive ? "translate-x-full" : ""
                    }`}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {isActive ? "Đang hoạt động" : "Đã vô hiệu hóa"}
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <div>
                <button className="text-gray-500 mr-4" onClick={onClose}>
                  Hủy bỏ
                </button>
                <button className="bg-green-400 text-white rounded-lg px-4 py-2">
                  Lưu thay đổi{" "}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <SpinnerWaiting />
        )}
      </div>
    </div>
  );
};

export default DetailTimeshareCompanyModal;
