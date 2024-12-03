import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logoTEP.png";
import { FaDownload } from "react-icons/fa";

const Navigation = () => {
  return (
    <nav className="bg-custom-blue p-4 h-[110px] flex justify-center">
      <div className=" px-10 w-full flex justify-between items-center">
        <div className="flex w-1/5 justify-start">
          <a href="/">
            <img
              src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731302217106_logoTEP.png"
              alt="Unwind Logo"
              className="h-[50px]  mr-2"
            />
          </a>
          {/* <label className='font-bold text-3xl text-white'>Unwind</label> */}
        </div>
        <ul className="flex justify-around text-white w-3/5 font-sans font-medium text-lg">
          <li className="group">
            <Link to={`/`} className="hover:text-gray-200">
              Trang chủ
            </Link>
            <div className="border-b-4 border-blue-400 group-hover:scale-x-100 scale-x-0 transform transition-transform duration-300 origin-left mt-1"></div>
          </li>
          <li className="group">
            <a href="/timesharecompanylist" className="hover:text-gray-200">
              Công ty Timeshare
            </a>
            <div className="border-b-4 border-blue-400 group-hover:scale-x-100 scale-x-0 transform transition-transform duration-300 origin-left mt-1"></div>
          </li>
          <li className="group">
            <a href="/aboutus" className="hover:text-gray-200">
              Về chúng tôi
            </a>
            <div className="border-b-4 border-blue-400 group-hover:scale-x-100 scale-x-0 transform transition-transform duration-300 origin-left mt-1"></div>
          </li>
          <li className="group">
            <a href="/blogs" className="hover:text-gray-200">
              Blog
            </a>
            <div className="border-b-4 border-blue-400 group-hover:scale-x-100 scale-x-0 transform transition-transform duration-300 origin-left mt-1"></div>
          </li>
          <li className="group">
            <a href="/contact" className="hover:text-gray-200">
              Liên hệ
            </a>
            <div className="border-b-4 border-blue-400 group-hover:scale-x-100 scale-x-0 transform transition-transform duration-300 origin-left mt-1"></div>
          </li>
          <li className="group">
            <a href="/policy" className="hover:text-gray-200">
              Chính sách
            </a>
            <div className="border-b-4 border-blue-400 group-hover:scale-x-100 scale-x-0 transform transition-transform duration-300 origin-left mt-1"></div>
          </li>
          <li className="group">
            <a href="/faqs" className="hover:text-gray-200">
              FAQs
            </a>
            <div className="border-b-4 border-blue-400 group-hover:scale-x-100 scale-x-0 transform transition-transform duration-300 origin-left mt-1"></div>
          </li>
        </ul>

        <ul className="flex items-center justify-end space-x-10 text-white w-2/5 text-lg font-extralight">
          <li>
            <Link to={"/"} className="hover:text-gray-200 flex">
              <FaDownload className="h-5 w-5 mr-3 mt-1" />
              Tải ứng dụng
            </Link>
          </li>
          <li className="border-2 hover:text-gray-200 border-blue-400 hover:border-gray-200 text-center rounded-xl w-36 h-10 flex justify-center items-center text-blue-400">
            <Link to={`/signin`} className="hover:text-gray-200">
              Đăng nhập
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
