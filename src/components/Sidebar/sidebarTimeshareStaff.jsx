import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaCity,
  FaChevronUp,
  FaChevronDown,
  FaMoneyBillAlt,
  FaChartBar,
  FaListAlt,
  FaUserCheck,
  FaRegFileAlt,
  FaRegFile,
} from "react-icons/fa";
import { setIsLogin, setRoleName } from "../../redux/UserSlice/SignIn";
import { useDispatch } from "react-redux";

const MenuItem = ({ icon: Icon, title, children, path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = path ? location.pathname === path : false;

  const hasActiveChild = children
    ? React.Children.toArray(children).some(
        (child) => child.props.path && location.pathname === child.props.path
      )
    : false;

  const isParentActive = isActive || hasActiveChild;

  const handleClick = (e) => {
    if (!path && children) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <Link
        to={path || "#"}
        onClick={handleClick}
        className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out ${
          isParentActive ? "bg-gray-300" : ""
        }`}
      >
        <div className="flex items-center">
          <Icon
            className={`text-lg transition-transform duration-200 ease-in-out ${
              isParentActive ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-500`}
          />
          <span
            className={`ml-2 transition-colors duration-200 ease-in-out ${
              isParentActive ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-500`}
          >
            {title}
          </span>
        </div>
        {children &&
          (isOpen ? (
            <FaChevronUp className="text-gray-600 transition-transform duration-200 ease-in-out" />
          ) : (
            <FaChevronDown className="text-gray-600 transition-transform duration-200 ease-in-out" />
          ))}
      </Link>
      {isOpen && <div className="ml-6">{children}</div>}
    </div>
  );
};

const SidebarTimeshareStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleName");
    dispatch(setIsLogin(false));
    dispatch(setRoleName(""));
    navigate("/signin");
  };
  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      <div className="flex items-center space-x-2 mb-8 px-6 mt-10">
        <img src="../src/assets/logoTEPblack.png" className="w-auto px-4" />
      </div>
      <div className="flex-grow p-5">
        <MenuItem icon={FaChartBar} title="Danh sách cho thuê" path="#" />
        <MenuItem icon={FaListAlt} title="Xác minh bài đăng" path="#" />
        <MenuItem icon={FaMoneyBillAlt} title="Danh sách yêu cầu">
          <MenuItem icon={FaUserCheck} title="Yêu cầu cho thuê" path="#" />
          <MenuItem icon={FaCity} title="Yêu cầu trao đổi" path="#" />
          <MenuItem icon={FaCity} title="Xác minh trao đổi" path="#" />
        </MenuItem>
        <MenuItem icon={FaRegFileAlt} title="Hỗ trợ định giá" path="#" />
        <MenuItem icon={FaRegFileAlt} title="Đánh giá khách hàng" path="#" />
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="px-4 mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center p-2 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out"
        >
          <FaSignOutAlt className="text-lg mr-2" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarTimeshareStaff;
