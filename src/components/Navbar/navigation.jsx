import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logoTEP.png";

const Navigation = () => {
  return (
    <nav className="bg-custom-blue p-4 h-[110px] flex justify-center">
      <div className=" px-10 w-full flex justify-between items-center">
        <div className="flex w-1/5 justify-start">
          <a href="/">
            {" "}
            <img src={logo} alt="Unwind Logo" className="h-[50px]  mr-2" />
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
            <a href="/resortsearchlist" className="hover:text-gray-200">
              Timeshare
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
            <a href="/contact" className="hover:text-gray-200">
              Liên hệ
            </a>
            <div className="border-b-4 border-blue-400 group-hover:scale-x-100 scale-x-0 transform transition-transform duration-300 origin-left mt-1"></div>
          </li>
        </ul>

        <ul className="flex items-center justify-end space-x-10 text-white w-2/5 text-lg font-extralight">
          <li>
            <a href="#" className="hover:text-gray-200 flex">
              {" "}
              <svg
                className="h-6 w-6"
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                ></path>
              </svg>
              Tải ứng dụng
            </a>
          </li>
          <li>
            <Link to={`/signin`} className="hover:text-gray-200">
              Đăng nhập
            </Link>
          </li>
          <li className="border-2 hover:text-gray-200 border-blue-400 hover:border-gray-200 text-center rounded-xl w-36 h-10 flex justify-center items-center text-blue-400">
            <a href="/signup">Đăng ký</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
