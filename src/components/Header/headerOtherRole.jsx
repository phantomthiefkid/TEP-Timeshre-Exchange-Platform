import React, { useEffect, useState } from 'react';
import { GlobeIcon, BellIcon } from '@heroicons/react/solid';
import { jwtDecode } from 'jwt-decode';
const Header = () => {
  const [info, setInfo] = useState()
  const token = localStorage.getItem("token")
  const decodeToken = jwtDecode(token);
 

  return (
    <header className="bg-white shadow-md border py-4 px-6 flex justify-between items-center">
      {/* Welcome Message */}
      <div className='px-4'>
        <h1 className="text-lg text-gray-500 font-semibold">Welcome,</h1>
        <h1 className='font-medium text-xl text-gray-600'> {decodeToken? decodeToken.RoleName : ""}</h1>
      </div>

      <div className="flex items-center space-x-10">
        {/* Notification Icon */}
        <div className="cursor-pointer relative">
          <BellIcon className="h-8 w-8 text-gray-600" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center"></span>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center space-x-8">
          <div className="text-left">
            <h2 className="text-lg font-semibold">{decodeToken? decodeToken.RoleName : ""}</h2>
            <p className="text-md text-gray-500">{decodeToken? decodeToken.email : ""}</p>
          </div>
          {/* Avatar */}
          <img
            src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=7kCCvto4rtEQ7kNvgFujVfw&_nc_ht=scontent.fsgn13-2.fna&_nc_gid=A5LQozwxCRKtMDXByoq1Rr1&oh=00_AYBz0eNQRECHr2LqNY8Qqz_EgXswQo9YTwlnJw5kf7bgug&oe=671A8799"
            alt="Admin Avatar"
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
        </div>
        <div className="cursor-pointer">
          <GlobeIcon className="h-8 w-8 text-blue-600" />
        </div>
      </div>
    </header>
  );
};

export default Header;
