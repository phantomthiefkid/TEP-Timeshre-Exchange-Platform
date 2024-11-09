import React, { useEffect, useState } from 'react';
import { GlobeIcon, BellIcon } from '@heroicons/react/solid';
import { jwtDecode } from 'jwt-decode';
import { FaBell, FaCog } from 'react-icons/fa';
const Header = () => {
  const [info, setInfo] = useState()
  const token = localStorage.getItem("token")
  const decodeToken = jwtDecode(token);


  return (
    <>
      <header className="flex items-center justify-between p-4 w-full h-[6rem] bg-white border-b-2">
        <div className="flex items-center w-1/2">
          <div className='px-4'>
            <h1 className="text-lg text-gray-500 font-semibold">Welcome,</h1>
            <h1 className='font-medium text-xl text-gray-600'> {decodeToken ? decodeToken.RoleName : ""}</h1>
          </div>
        </div>
        <div className="flex items-center w-1/4 space-x-4">
          <div className="relative">
            <div className="relative bg-gray-200 rounded-3xl cursor-pointer">
              <div className="p-2">
                <FaBell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center"></span>
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
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/404249021_917204383097753_8133391908993607780_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=d0IUGZEqzCQQ7kNvgF4nPMZ&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=AaYNOwW4xElRCgCOqM5cxeV&oh=00_AYAMM6wsRoQVYOLV_ss-US9t6bFdz5rSEjU935t2p6wohw&oe=67282FBC"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            <div>
              <h2 className="font-semibold">{decodeToken ? decodeToken.RoleName : ""}</h2>
              <p className="text-sm text-gray-500">{decodeToken ? decodeToken.email : ""}</p>
            </div>
            {/* Avatar */}

          </div>
          <div className="cursor-pointer">
            <GlobeIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
