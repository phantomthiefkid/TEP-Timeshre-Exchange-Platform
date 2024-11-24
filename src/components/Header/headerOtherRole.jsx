import React, { useState, useEffect, useRef } from 'react';
import { GlobeIcon, BellIcon } from '@heroicons/react/solid';
import { jwtDecode } from 'jwt-decode';
import { FaBell, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getProfileTsCompany } from '../../service/tsCompanyService/tsCompanyAPI';
const Header = () => {
  const [info, setInfo] = useState()
  const token = localStorage.getItem("token")
  const decodeToken = jwtDecode(token);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [tsc, setTsc] = useState({});
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (decodeToken && decodeToken.RoleName === "TIMESHARECOMPANY") {
          let data = await getProfileTsCompany();
          if (data.status === 200) {
            setTsc(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [decodeToken]); 


  return (
    <>
      <header className="flex items-center justify-between p-6 w-full h-[7rem] bg-gradient-to-r from-white to-blue-50 border-b-2 ">
        <div className="flex items-center w-1/2 space-x-4">
          <div className="flex items-center bg-white p-4 rounded-lg">
            <h1 className="text-md text-gray-500 font-semibold">Welcome,</h1>
            <h1 className="ml-2 font-bold text-md text-blue-600"> {decodeToken ? decodeToken.RoleName : ""}</h1>
          </div>
        </div>

        <div className="flex items-center w-1/2 justify-end space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <div className="relative bg-blue-200 rounded-full p-3 shadow-lg cursor-pointer transition duration-300 hover:bg-blue-300">
              <FaBell className="h-6 w-6 text-blue-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">3</span>
            </div>
          </div>

          {/* Settings Icon */}
          <div className="relative">
            {/* Settings Icon */}
            <div
              className="bg-blue-200 rounded-full p-3 shadow-lg cursor-pointer transition duration-300 hover:bg-blue-300"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaCog className="h-6 w-6 text-blue-600" />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && decodeToken.RoleName === "TIMESHARECOMPANY" && (
              <div
                className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border z-10"
              >
                <ul>
                  <Link to={`/timesharecompany/profiletscompany`}>
                    <li onClick={() => setDropdownOpen(false)}
                      className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
                    >
                      Chỉnh sửa hồ sơ công ty
                    </li></Link>
                  <li
                    className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
                  >
                    Đăng xuất
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4  p-4 rounded-lg">
            <img
              src={tsc && tsc.logo || "https://cdn3.iconfinder.com/data/icons/30-office-business-sticker-icons-part-1/202/Businesman-512.png"}
              alt="Admin Avatar"
              className="w-12 h-12 rounded-full border-2 border-blue-300 shadow-sm"
            />
            <div>
              <h2 className="font-bold text-gray-700">{decodeToken ? decodeToken.RoleName : ""}</h2>
              <p className="text-sm text-gray-500">{decodeToken ? decodeToken.email : ""}</p>
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

export default Header;
