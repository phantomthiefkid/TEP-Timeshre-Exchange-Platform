import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, LogoutIcon } from '@heroicons/react/solid';
import { menuSystemStaffItem } from '../../util/MenuSidebarItem';
import logoUnwind from "../../assets/logoTEPblack.png";
import logoOnly from "../../assets/LogoUnwind.png";
import { motion } from 'framer-motion';

const SidebarSystemStaff = () => {
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
    <div className="min-h-screen flex bg-gray-50 shadow-xl">
      {/* Sidebar */}
      <motion.div
        initial={{ width: isOpen ? '6rem' : '18rem' }}
        animate={{ width: isOpen ? '18rem' : '6rem' }}
        transition={{ duration: 0.5 }}
        className="relative bg-white shadow-xl text-gray-900 space-y-6 min-h-screen flex flex-col justify-between"
      >
        {/* Sidebar toggle button */}
        <motion.button
          onClick={toggleSidebar}
          className="absolute top-4 -right-4 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors shadow-lg"
          whileHover={{ scale: 1.1 }}
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
              <img src={logoUnwind} className="w-auto px-4" />
            ) : (
              <img src={logoOnly} className="w-auto" />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-center"
          >
            {isOpen ? (
              <span className="text-lg font-bold text-gray-500">System Staff</span>
            ) : (
              <span className="text-xs font-semibold text-gray-700"></span>
            )}
          </motion.div>

          {/* Menu Items */}
          <ul className="space-y-4 py-6 border-t-2 border-gray-400">
            {menuSystemStaffItem
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
                      `flex ml-6 items-center space-x-4 p-3 text-sm rounded-l-2xl transition-all duration-200 ease-in-out hover:bg-blue-500 hover:text-gray-200
                      ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-600'}`
                    }
                  >
                    <motion.div
                    className="w-6 h-6"
                    style={{ color: item.color }}
                    whileHover={{ rotate: 10 }}
                  >
                      {item.icon}
                    </motion.div>
                    {isOpen && (
                      <motion.span
                        className="text-base font-medium whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </NavLink>
                </motion.li>
              ))}
          </ul>
        </div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-auto pt-6"
        >
          <NavLink
            to="/logout"
            className={({ isActive }) =>
            `flex items-center space-x-3 ml-4 p-3 hover:bg-red-500 duration-200 ease-in-out hover:rounded-l-full hover:text-white 
            ${isActive ? 'bg-red-600 text-white rounded-l-full shadow-lg' : ''}`
            }
          >
            <motion.div whileHover={{ rotate: -10 }}>
              <LogoutIcon className="h-6 w-6" />
            </motion.div>
            {isOpen && <span className="text-base font-medium">Đăng xuất</span>}
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SidebarSystemStaff;
