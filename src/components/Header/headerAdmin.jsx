import React, { useEffect, useState } from 'react';
import { GlobeIcon, BellIcon } from '@heroicons/react/solid';
import { getAccountInfo } from '../../service/accountAPI/accountService';
import { useSelector } from 'react-redux';
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
    <header className="bg-white shadow-md border py-4 px-6 flex justify-between items-center">
      {/* Welcome Message */}
      <div className='px-4'>
        <h1 className="text-lg text-gray-500 font-semibold">Welcome,</h1>
        <h1 className='font-medium text-xl text-gray-600'> {info? info.roleName : ""}</h1>
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
            <h2 className="text-lg font-semibold">{info? info.roleName : ""}</h2>
            <p className="text-md text-gray-500">{info? info.email : ""}</p>
          </div>
          {/* Avatar */}
          <img
            src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/453487820_1922600311486091_4189476110642682886_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=D_-yzjvsClsQ7kNvgG2ZjZ-&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AjICefPScxV7vJ2ebSNG6Xd&oh=00_AYDVjktdpn49fSv8hQHfLlGKhdz-q377YX6taJ0uuL4LQg&oe=6728FBEC"
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

export default HeaderAdmin;
