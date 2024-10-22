import { jwtDecode } from "jwt-decode";
import React from "react";
import { FaCog } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

const headerTimeshareStaff = () => {
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);

  return (
    <div>
      {/* <header className="bg-white shadow-md border py-4 px-6 flex justify-between items-center">
        <div>
          <div className="px-4">
            <h1 className="text-lg text-gray-500 font-semibold">Welcome,</h1>
            <h1 className="font-medium text-xl text-gray-600">
              {decodeToken ? decodeToken.RoleName : ""}
            </h1>
          </div>

          <div className="flex items-center space-x-10">
            <div className="cursor-pointer relative">
              <FaBell className="h-8 w-8 text-gray-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center"></span>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-left">
                <h2 className="text-lg font-semibold">
                  {decodeToken ? decodeToken.RoleName : ""}
                </h2>
                <p className="text-md text-gray-500">
                  {decodeToken ? decodeToken.email : ""}
                </p>
              </div>
              <img
                src="https://scontent.fsgn24-2.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jEeocNqmB_cQ7kNvgFG2GAo&_nc_ht=scontent.fsgn24-2.fna&_nc_gid=AYsYSfR5qtCYt43Z5wL6smV&oh=00_AYCMvj7CdMZnxlF8thje_1jF3ncfSLcpf54nwMrKh87Oow&oe=6701B359"
                alt="Admin Avatar"
                className="w-16 h-16 rounded-full border-2 border-gray-300"
              />
            </div>
          </div>
        </div>
      </header> */}
      <header className="flex items-center justify-between p-4 w-full h-[6rem]">
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
