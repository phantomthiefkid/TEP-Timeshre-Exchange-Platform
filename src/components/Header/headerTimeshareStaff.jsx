import { GlobeIcon } from "@heroicons/react/solid";
import { jwtDecode } from 'jwt-decode';
import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import NotificationDropdown from "../Modal/notification/notificationModal";

const HeaderTimeshareStaff = () => {
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  return (
    <>
      <header className="flex items-center justify-between p-6 w-full h-[7rem] bg-gradient-to-r from-white to-blue-50 border-b-2">
        <div className="flex items-center w-1/2 space-x-4">
          <div className="flex items-center bg-white p-4 rounded-lg">
            <h1 className="text-md text-gray-500 font-semibold">Welcome,</h1>
            <h1 className="ml-2 font-bold text-md text-blue-600">
              {decodeToken ? decodeToken.RoleName : ""}
            </h1>
          </div>
        </div>

        <div className="flex items-center w-1/2 justify-end space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <div
              onClick={toggleNotificationDropdown}
              className="relative bg-blue-200 rounded-full p-3 shadow-lg cursor-pointer transition duration-300 hover:bg-blue-300"
            >
              <FaBell className="h-6 w-6 text-blue-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                3
              </span>
              {isNotificationOpen && (
              
              <div className="absolute top-6 z-50"><NotificationDropdown onClose={toggleNotificationDropdown} /></div>
           
          )}
            </div>
          
          </div>

          {/* Settings Icon */}
          <div className="relative bg-blue-200 rounded-full p-3 shadow-lg cursor-pointer transition duration-300 hover:bg-blue-300">
            <FaCog className="h-6 w-6 text-blue-600" />
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4 p-4 rounded-lg">
            <img
              src="https://cdn3.iconfinder.com/data/icons/30-office-business-sticker-icons-part-1/202/Businesman-512.png"
              alt="Admin Avatar"
              className="w-12 h-12 rounded-full border-4 border-blue-300 shadow-sm"
            />
            <div>
              <h2 className="font-bold text-gray-700">
                {decodeToken ? decodeToken.RoleName : ""}
              </h2>
              <p className="text-sm text-gray-500">
                {decodeToken ? decodeToken.email : ""}
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="cursor-pointer bg-blue-200 p-3 rounded-full shadow-lg transition duration-300 hover:bg-blue-300">
            <GlobeIcon className="h-7 w-7 text-blue-600" />
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderTimeshareStaff;
