import React, { useState, useEffect } from "react";
import axios from "axios";
import platformLogo from "../../assets/logoTEPblack.png";
import { FaXmark } from "react-icons/fa6";

const createTimeshareCompanyModal = ({ isOpen, onClose, onCreate }) => {
  const [timeshareCompanyName, setTimeshareCompanyName] = useState("");
  const [logo, setLogo] = useState("");
  const [address, setAddress] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(""); // Track errors

  // Fetch accounts on modal open
  const getAllTSC = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        "http://35.247.160.131/api/admin/users/timeshare-company",
        { headers }
      );
      console.log(response.data); // Log the response for debugging

      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error.response || error);
      setError("Failed to load accounts. Please try again.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      getAllTSC(); // Fetch accounts when the modal is opened
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTimeshareCompany = {
      id: 0,
      timeshareCompanyName,
      logo,
      address,
      description,
      ownerId: parseInt(ownerId, 10), // Convert to number
      contact,
      isActive: true,
    };

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        "http://35.247.160.131/api/admin/timeshare-company",
        newTimeshareCompany,
        { headers }
      );
      onCreate(response.data); // Trigger the onCreate callback with new data

      // Clear form after submission
      setTimeshareCompanyName("");
      setLogo("");
      setAddress("");
      setDescription("");
      setOwnerId("");
      setContact("");

      // Close modal
      onClose();
    } catch (error) {
      console.error("Error creating company:", error.response || error);
      setError("Failed to create company. Please try again.");
    }
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

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Tạo mới đối tác
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Select Timeshare Company Account */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Tài khoản đối tác
            </label>
            <select
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn tài khoản</option>
              {accounts &&
                accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.userName} ({account.email})
                  </option>
                ))}
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
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Mô tả
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
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

export default createTimeshareCompanyModal;
