import { jwtDecode } from "jwt-decode";
import React from "react";
import { FaCog } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

const headerTimeshareStaff = () => {
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);

  return (
    <div>
      <header className="flex items-center justify-between p-4 w-full h-[6rem] bg-white">
        <div className="flex items-center w-1/2">
          <div className="px-4">
            <h1 className="text-lg text-gray-500 font-semibold">Welcome,</h1>
            <h1 className="font-medium text-xl text-gray-600">
              {decodeToken ? decodeToken.sub : ""}
            </h1>
          </div>
        </div>
        <div className="flex items-center w-1/4 space-x-4">
          <div className="relative">
            <div className="relative bg-gray-200 rounded-3xl cursor-pointer">
              <div className="p-2">
                <FaBell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-600 rounded-full"></span>
              </div>
            </div>
          </div>
          <div className="relative bg-gray-200 rounded-3xl cursor-pointer">
            <div className="p-2">
              <FaCog className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <img
              src="https://placehold.co/40x40"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            <div>
              <div className="font-semibold">
                {decodeToken ? decodeToken.sub : ""}
              </div>
              <div className="text-sm text-gray-500">
                {decodeToken ? decodeToken.RoleName : ""}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default headerTimeshareStaff;
