import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import { menuAdminItem } from "../../util/MenuSidebarItem";
import logoUnwind from "../../assets/logoTEP.png";
import logoOnly from "../../assets/LogoUnwind.png";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setIsLogin, setRoleName } from "../../redux/UserSlice/SignIn";
const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleName");
    dispatch(setIsLogin(false));
    dispatch(setRoleName(""));
    navigate("/signin");
  };

  return (
    <div className="flex border-r-2 border-gray-200">
    
      <motion.div
        initial={{ width: isOpen ? "6rem" : "18rem" }}
        animate={{ width: isOpen ? "18rem" : "6rem" }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-b from-custom-blue via-gray-700 to-gray-500 shadow-xl text-gray-900 space-y-6 min-h-screen flex flex-col justify-between"
      >
       
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

        <div>
          <motion.div
            className="flex items-center space-x-2 mb-8 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isOpen ? (
              <img src={logoUnwind} className="w-auto" />
            ) : (
              <img src={logoOnly} className="w-auto" />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {isOpen ? (
              <span className="text-lg font-bold text-gray-200">Admin</span>
            ) : (
              <span className="text-xs font-semibold text-gray-700"></span>
            )}
          </motion.div>
        
          <ul className="space-y-4 py-6 border-t-2 border-gray-400">
            {menuAdminItem
              .filter((item) => item.visible)
              .map((item, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05 }} 
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 ml-4 p-3 hover:bg-blue-800 duration-75 ease-in-out hover:rounded-l-3xl 
          ${
            isActive
              ? "bg-blue-800 text-white rounded-l-3xl shadow-xl"
              : "text-gray-300"
          }`
                    }
                  >
                    <motion.div
                      style={{ color: item.color }} 
                      whileHover={{ rotate: 10 }} 
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

        <div className=""></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleLogout}
        >
          <div className="flex items-center space-x-3 ml-4 p-3 hover:bg-red-600 duration-200 ease-in-out hover:rounded-l-full hover:text-white">
            <motion.div whileHover={{ rotate: -10 }}>
              {" "}
             
              <LogoutIcon className="h-6 w-6" />
            </motion.div>
            {isOpen && <button className="text-lg">Đăng xuất</button>}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SidebarAdmin;
