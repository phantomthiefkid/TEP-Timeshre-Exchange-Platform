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
  FaList,
  FaListOl,
  FaComment,
  FaRegNewspaper,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setIsLogin, setRoleName } from "../../redux/UserSlice/SignIn";

const MenuItem = ({ icon: Icon, title, children, path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if the current location's pathname matches the current path
  const isActive = path ? location.pathname.startsWith(path) : false;

  // Check if any child is active by comparing each child's path
  const hasActiveChild = children
    ? React.Children.toArray(children).some(
        (child) =>
          child.props.path && location.pathname.startsWith(child.props.path)
      )
    : false;

  const isParentActive = isActive || hasActiveChild;

  // Handle dropdown toggle for nested menu items
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
        className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out rounded-xl w-[94%] ml-2 ${
          isParentActive ? "bg-gray-200" : ""
        }`}
      >
        <div className="flex items-center">
          <Icon
            className={`text-lg transition-transform duration-200 ease-in-out ${
              isParentActive ? "text-blue-600" : "text-gray-700"
            }`}
          />
          <span
            className={`ml-2 transition-colors duration-200 ease-in-out ${
              isParentActive ? "text-blue-600" : "text-gray-700"
            }`}
            style={isParentActive ? { color: "#2563eb" } : {}}
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

const SidebarSystemStaff = () => {
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
        <img
          src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731303353778_logoTEPblack.png"
          alt="logo"
          className="w-auto px-4"
        />
      </div>
      <div className="flex-grow space-y-2">
        <MenuItem icon={FaChartBar} title="Dashboard" path="dashboard" />

        <MenuItem icon={FaListAlt} title="Bài đăng">
          <div className="space-y-2 ml-4">
            <MenuItem icon={FaList} title="Danh sách bài đăng" path="post" />
            <MenuItem
              icon={FaListOl}
              title="Danh sách định giá"
              path="valuationlist"
            />
          </div>
        </MenuItem>
        <MenuItem
          icon={FaComment}
          title="Quản lí phản hồi"
          path="feedbackmng"
        />
        <MenuItem icon={FaMoneyBillAlt} title="Thanh toán">
          <div className="space-y-2 ml-4">
            <MenuItem icon={FaUserCheck} title="Người đăng" path="#" />
            <MenuItem icon={FaCity} title="Công ty Timeshare" path="#" />
          </div>
        </MenuItem>
        {/* <MenuItem icon={FaRegFileAlt} title="Quản lí FAQs" path="#" />
        <MenuItem icon={FaRegFile} title="Quản lí chính sách" path="#" /> */}
        <MenuItem
          icon={FaRegNewspaper}
          title="Quản lí bài blog"
          path="blogmanagement"
        />
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="px-4 mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center p-2 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out w-full"
        >
          <FaSignOutAlt className="text-lg mr-2" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};
export default SidebarSystemStaff;
