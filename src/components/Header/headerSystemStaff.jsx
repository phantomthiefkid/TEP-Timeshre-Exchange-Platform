import { GlobeIcon } from "@heroicons/react/solid";
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { getNotificationByTopic, markReadByTopic, subcribeToken } from "../../service/notificationService/notiicationAPI";
import { listenForMessages } from "../../util/firebaseConfig/notification";
import NotificationModalSystemStaff from "../Modal/notification/notificationModalSystemStaff";
const HeaderSystemStaff = () => {
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [list, setList] = useState([])
  const [notification, setNotification] = useState(null);
  const FCM_TOKEN = localStorage.getItem("FCM_TOKEN")
  

  const toggleNotificationDropdown = async () => {
    try {
      let data = await getNotificationByTopic("systemstaff", 0, 10);
      if (data.status === 200) {
        setList(data.data.content)

      }
    } catch (error) {
      throw error
    } finally {
      setIsNotificationOpen((prev) => !prev);
    }

  };

  const subcribe = async () => {
    try {
      await subcribeToken(FCM_TOKEN, `systemstaff`)
    } catch (error) {
      throw error
    }
  }
  subcribe()
  useEffect(() => {
    
    listenForMessages(setNotification);

    const timer = setTimeout(() => {
     
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timer);

  }, [FCM_TOKEN, notification]);

  const handleMarkAll = async () => {
    try {
      
      await markReadByTopic("systemstaff");

      
      let updatedData = await getNotificationByTopic("systemstaff", 0, 10);
      if (updatedData.status === 200) {
        setList(updatedData.data.content);
      }
    } catch (error) {
      console.error("Error marking all notifications as read: ", error);
    }
  };

 
  const handleOnClose = () => {
    setIsNotificationOpen((prev) => prev);
  }

  return (
    <>
      <header className="flex items-center justify-between p-6 w-full h-[7rem] bg-gradient-to-r from-white to-blue-50 border-b-2 relative">
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
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">

              </span>
              {isNotificationOpen && (

                <div className="absolute top-6 right-16 z-50"><NotificationModalSystemStaff onClose={handleOnClose} content={list} onMarkAllRead={handleMarkAll} onClick={() => setIsNotificationOpen(false)}/></div>

              )}
            </div>

          </div>

          {/* Settings Icon */}
          {/* <div className="relative bg-blue-200 rounded-full p-3 shadow-lg cursor-pointer transition duration-300 hover:bg-blue-300">
            <FaCog className="h-6 w-6 text-blue-600" />
          </div> */}

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


          <div className="cursor-pointer bg-blue-200 p-3 rounded-full shadow-lg transition duration-300 hover:bg-blue-300">
            <GlobeIcon className="h-7 w-7 text-blue-600" />
          </div>
        </div>
        {notification && (
          <div className="fixed top-6 right-6 max-w-xs bg-indigo-400 text-white rounded-xl shadow-xl p-5 z-50 animate-fadeIn">
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full">

                <FaBell className="w-6 h-6 text-yellow-300" />
              </div>


              <div className="flex-1">
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className="text-sm mt-1">{notification.body}</p>
              </div>


              <button
                className="text-white hover:text-gray-200 transition-opacity focus:outline-none"
                onClick={() => setNotification(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default HeaderSystemStaff;
