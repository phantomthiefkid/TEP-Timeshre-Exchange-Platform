import React from "react";
import { Link } from "react-router-dom";
import { PhoneIcon, MailIcon } from "@heroicons/react/solid";
const Footer = () => {
  return (
    <footer className="min-h-[200px] bg-custom-blue flex flex-wrap w-full py-14 text-white">
      <div className="w-2/5 flex justify-center items-center">
        <a href="/">
          <img src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731303236589_logoTEP.png" className="w-[246px]" alt="logo" />
        </a>
      </div>
      <div className="w-1/5 p-6">
        <ul className="space-y-4">
          <label className="text-xl font-medium">Thông tin hữu ích</label>
          <li>
            <Link to={"/aboutus"}>Về chúng tôi</Link>
          </li>
          <li>
            <Link to={"/contact"}>Liên hệ</Link>
          </li>
          <li>
            <Link to={"/faqs"}>FAQs</Link>
          </li>
          <li>
            <Link to={"/policy"}>Chính sách quyền riêng tư</Link>
          </li>
        </ul>
      </div>
      <div className="w-1/5 p-6">
        <ul className="space-y-4">
          <label className="text-xl font-medium">Địa chỉ</label>
          <li>
            <Link to={"/"}>
              D1 Street, Long Thanh My, Thu Duc City, Ho Chi Minh, Viet Nam
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-1/5 p-6">
        <ul className="space-y-4">
          <label className="text-xl font-medium">Liên hệ</label>
          <li className="flex items-center">
            <PhoneIcon className="h-4 w-4 mr-2" /> 098-2743-392
          </li>
          <li className="flex items-center">
            <MailIcon className="h-4 w-4 mr-2" />
            unwind@hotmail.com
          </li>
        </ul>
      </div>
      <div className="w-full mt-10 text-center">
        <hr className="w-4/5 mx-auto"></hr>
        <p className="mt-10">
          {" "}
          © Bản quyền thuộc về Unwind. Phát triển bởi{" "}
          <u className="text-blue-600">Unwind</u>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
