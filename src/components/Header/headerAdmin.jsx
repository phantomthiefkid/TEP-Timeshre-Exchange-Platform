import React, { useEffect, useState } from 'react';
import { GlobeIcon, BellIcon } from '@heroicons/react/solid';
import { getAccountInfo } from '../../service/accountAPI/accountService';
import { useSelector } from 'react-redux';
import { FaBell, FaCog } from 'react-icons/fa';
const HeaderAdmin = () => {
  const [info, setInfo] = useState();
  const { userId } = useSelector((state) => state.isLogin)

  const fetchAccountInfo = async () => {
    let data = await getAccountInfo(userId);
    try {
      if (data) {
        setInfo(data.data);
        console("Data: ", data.data)
      }
    } catch (error) {
      console.error("Error fetching account info:", error);
    }

  };


  useEffect(() => {
    if (userId) {
      console.log("UserId is now set, fetching account info");
      fetchAccountInfo();
    }
  }, [userId]);  // Gọi lại useEffect khi userId được thay đổi


  return (
    <div>
    <header className="flex items-center justify-between p-6 w-full h-[7rem] bg-gradient-to-r from-white to-blue-50 border-b-2">
      <div className="flex items-center w-1/2 space-x-4">
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md hover:bg-blue-50">
          <h1 className="text-md text-gray-500 font-semibold">Welcome,</h1>
          <h1 className="ml-2 font-bold text-md text-blue-600">
            {info ? info.roleName : ""}
          </h1>
        </div>
      </div>
  
      <div className="flex items-center w-1/2 justify-end space-x-6">
        {/* Notification Icon */}
        <div className="relative bg-blue-200 rounded-full p-3 shadow-lg cursor-pointer transition duration-300 hover:bg-blue-300">
          <FaBell className="h-6 w-6 text-blue-600" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            3
          </span>
        </div>
  
        {/* Settings Icon */}
        <div className="relative bg-blue-200 rounded-full p-3 shadow-lg cursor-pointer transition duration-300 hover:bg-blue-300">
          <FaCog className="h-6 w-6 text-blue-600" />
        </div>
  
        {/* Profile Section */}
        <div className="flex items-center space-x-4 p-4 ">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9703/9703596.png"
            alt="Admin Avatar"
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              {info ? info.roleName : ""}
            </h2>
            <p className="text-md text-gray-500">
              {info ? info.email : ""}
            </p>
          </div>
        </div>
  
        {/* Language Switcher */}
        <div className="cursor-pointer bg-blue-200 p-3 rounded-full shadow-lg transition duration-300 hover:bg-blue-300">
          <GlobeIcon className="h-8 w-8 text-blue-600" />
        </div>
      </div>
    </header>
  </div>
  
  );
};

export default HeaderAdmin;
