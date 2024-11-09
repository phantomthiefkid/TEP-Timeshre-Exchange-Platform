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
      <header className="flex items-center justify-between p-4 w-full h-[6rem] bg-white border-b-2">
        <div className="flex items-center w-1/2">
          <div className='px-4'>
            <h1 className="text-lg text-gray-500 font-semibold">Welcome, </h1>
            <h1 className='font-medium text-md text-gray-600'> {info ? info.roleName : ""}</h1>
          </div>
        </div>
        <div className="flex items-center w-1/4 space-x-4">
          {/* Notification Icon */}
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
          {/* Admin Profile */}
          <div className="flex items-center space-x-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9703/9703596.png"
              alt="Admin Avatar"
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            <div className="text-left">
              <h2 className="text-lg font-semibold">{info ? info.roleName : ""}</h2>
              <p className="text-md text-gray-500">{info ? info.email : ""}</p>
            </div>
            {/* Avatar */}

          </div>
          <div className="cursor-pointer">
            <GlobeIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderAdmin;
