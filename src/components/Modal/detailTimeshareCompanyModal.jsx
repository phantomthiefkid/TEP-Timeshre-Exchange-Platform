import React, { useState } from "react";
import { FaAddressCard, FaLocationDot, FaUser, FaXmark } from "react-icons/fa6";
import SpinnerWaiting from "../LoadingComponent/spinnerWaiting";

const DetailTimeshareCompanyModal = ({ isOpen, onClose, company }) => {
  const [isActive, setIsActive] = useState(company?.isActive || false); // Track the toggle status

  if (!isOpen) return null;
console.log(company)
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
          className="absolute top-[28%] right-[34%] text-gray-500 hover:text-red-500 focus:outline-none"
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
                  value={company.location.displayName || "N/A"}
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
          </div>
        ) : (
          <SpinnerWaiting />
        )}
      </div>
    </div>
  );
};

export default DetailTimeshareCompanyModal;
