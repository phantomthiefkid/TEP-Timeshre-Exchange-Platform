import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, LogoutIcon,  } from '@heroicons/react/solid';
import { menuAdminItem } from '../../util/MenuSidebarItem';
import logoUnwind from "../../assets/logoTEP.png";
import logoOnly from "../../assets/LogoUnwind.png";
import { motion } from 'framer-motion';

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  return (
    <div className="min-h-screen flex border-r-2 border-gray-200">
      {/* Sidebar */}
      <motion.div
        initial={{ width: isOpen ? '6rem' : '18rem' }}
        animate={{ width: isOpen ? '18rem' : '6rem' }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-b from-custom-blue via-gray-700 to-gray-500 shadow-xl text-gray-900 space-y-6 min-h-screen flex flex-col justify-between"
      >
        {/* Sidebar toggle button */}
        <motion.button
          onClick={toggleSidebar}
          className="absolute top-4 -right-6 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors shadow-lg"
          whileHover={{ scale: 1.2 }}
        >
          {isOpen ? (
            <ChevronLeftIcon className="h-6 w-6" />
          ) : (
            <ChevronRightIcon className="h-6 w-6" />
          )}
        </motion.button>

        {/* Logo and Title */}
        <div>
          <motion.div className="flex items-center space-x-2 mb-8 px-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {isOpen ? (
              <img src={logoUnwind} className="w-auto" />
            ) : (
              <img src={logoOnly} className="w-auto" />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-center"
          >
            {isOpen ? (
              <span className="text-lg font-bold text-gray-200">Admin</span>
            ) : (
              <span className="text-xs font-semibold text-gray-700"></span>
            )}
          </motion.div>
          {/* Menu Items */}
          <ul className="space-y-4 py-6 border-t-2 border-gray-400">
            {menuAdminItem
              .filter(item => item.visible)
              .map((item, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05 }}  // Slight scale on hover
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 ml-4 p-3 hover:bg-blue-800 duration-75 ease-in-out hover:rounded-l-3xl 
          ${isActive ? 'bg-blue-800 text-white rounded-l-3xl shadow-xl' : 'text-gray-300'}`
                    }
                  >
                    <motion.div
                      style={{ color: item.color }}  // Apply the color from item.color
                      whileHover={{ rotate: 10 }}  // Add slight rotation on hover
                    >
                      {item.icon}
                    </motion.div>
                    {isOpen && (
                      <span className="text-lg font-bold truncate max-w-full">
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                </motion.li>
              ))}

          </ul>
        </div>

        {/* Divider line */}
        <div className=""></div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              `flex items-center space-x-3 ml-4 p-3 hover:bg-red-600 duration-200 ease-in-out hover:rounded-l-full hover:text-white 
              ${isActive ? 'bg-red-600 text-white rounded-l-full shadow-lg' : ''}`
            }
          >
            <motion.div whileHover={{ rotate: -10 }}> {/* Add slight rotation on hover */}
              <LogoutIcon className="h-6 w-6" />
            </motion.div>
            {isOpen && <span className="text-lg">Đăng xuất</span>}
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SidebarAdmin;
