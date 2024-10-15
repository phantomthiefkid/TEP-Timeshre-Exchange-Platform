import React, { useState } from "react";
import platformLogo from "../../assets/logoTEPblack.png";
import { FaXmark } from "react-icons/fa6";

const creatTimeshareCompanyModal = ({ isOpen, onClose, onCreate }) => {
  const [timeshareCompanyName, setTimeshareCompanyName] = useState("");
  const [logo, setLogo] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTimshareCompany = {
      timeshareCompanyName,
      logo,
      address,
      description,
      ownerId,
      contact,
    };
    onCreate(newTimshareCompany);

    setTimeshareCompanyName("");
    setLogo("");
    setAddress("");
    setDescription("");
    setOwnerId("");
    setContact("");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-7 right-[33%] text-gray-500 hover:text-red-500 focus:outline-none"
        >
          <FaXmark size={24} />
        </button>
        <div className="flex justify-center mb-4 py-4">
          <img src={platformLogo} alt="Platform Logo" className="h-12 w-auto" />
        </div>

        <h2 className="text-2xl  font-semibold text-gray-700 mb-4">
          Tạo mới đối tác
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Get TSCompany Account */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Tài khoản đối tác
            </label>
            <select
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-16"
              required
            >
              <option value="1">Acc1</option>
              <option value="2">Acc2</option>
              <option value="3">Acc3</option>
              <option value="4">Acc4</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Tên công ty timeshare
            </label>
            <input
              type="text"
              value={timeshareCompanyName}
              onChange={(e) => setTimeshareCompanyName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Logo</label>
            <input
              type="url"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Địa chỉ
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Thông tin liên lạc
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Mô tả
            </label>
            <textarea
              type="text"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Thêm đối tác
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default creatTimeshareCompanyModal;
