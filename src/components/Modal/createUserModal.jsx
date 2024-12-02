import React, { useState } from "react";
import logo from "../../assets/logoTEPblack.png";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { FaXmark } from "react-icons/fa6";
const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  // State to hold form data
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("1"); // Default role is customer
  const [showPassword, setShowPassword] = useState(false);
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass form data to the parent component for further processing
    const newUser = {
      email,
      username,
      password,
      roleId: Number(roleId),
    };
    onCreate(newUser);

    // Clear form fields after submission
    setEmail("");
    setUsername("");
    setPassword("");
    setRoleId("1");

    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-4 py-4">
          <button
            onClick={onClose}
            className="absolute top-[20%] right-[39%] text-gray-500 hover:text-red-500 focus:outline-none"
          >
            <FaXmark size={24} />
          </button>
          <img
            src={logo}
            alt="Platform Logo"
            className="h-12 w-auto" // Adjust height and width as needed
          />
        </div>

        <h2 className="text-2xl  font-semibold text-gray-700 mb-4">
          Tạo mới tài khoản
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle state
              className="absolute right-3 top-10 text-gray-600"
            >
              {showPassword ? (
                <EyeIcon className="w-5" color="black" />
              ) : (
                <EyeOffIcon className="w-5" color="black" />
              )}{" "}
              {/* Change button label */}
            </button>
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Vài trò
            </label>
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="1">Khách hàng</option>
              <option value="2">Công ty Timeshare</option>
              <option value="3">Nhân viên hệ thống</option>
              <option value="4">Quản trị viên</option>
            </select>
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
              Tạo tài khoản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
