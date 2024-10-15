import React from "react";
import Navigation from "../../components/Navbar/navigation";
import Footer from "../../components/Footer/footer";

const contact = () => {
  return (
    <>
      <Navigation />
      <div className="bg-[#335167] flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col md:flex-row justify-center w-full">
          <div className="text-white p-8 w-1/3 ">
            <h1 className="text-4xl font-bold mb-4">Liên hệ</h1>
            <p className="text-lg">
              Mọi thắc mắc xin vui lòng liên hệ với chúng tôi qua email. Chúng
              tôi sẽ trả lời trong vòng 24 giờ làm việc.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <form className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700">Tên của bạn</label>
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn"
                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  />
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <label className="block text-gray-700">Địa chỉ Email</label>
                  <input
                    type="email"
                    placeholder="Nhập địa chỉ email của bạn"
                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700">Số điện thoại</label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại của bạn"
                  className="w-full border border-gray-300 rounded-md p-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-gray-700">Nội dung</label>
                <textarea
                  placeholder="Lời nhắn"
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 h-32"
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                >
                  Gửi yêu cầu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default contact;
