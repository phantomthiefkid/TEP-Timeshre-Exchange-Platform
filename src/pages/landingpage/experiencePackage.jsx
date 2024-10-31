import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";

const ExperiencePackage = () => {
  const [selectedPackage, setSelectedPackage] = useState("rent");

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  return (
    <div className="min-h-[h-h-landing-child-4] px-20">
      <div className="w-full text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-700">
          Nâng cao trải nghiệm
        </h1>
        <p className="py-4 text-base md:text-lg">
          Tận hưởng giá ưu đãi và các khuyến mãi đặc biệt dành riêng cho Member.
        </p>
      </div>

      {/* Package selection buttons */}
      <div className="flex flex-col md:flex-row justify-center py-6">
        <button
          className={`rounded-t-lg md:rounded-l-lg md:rounded-tr-none w-full md:w-80 px-4 py-2 ${
            selectedPackage === "rent"
              ? "bg-sky-500 text-white hover:bg-sky-600"
              : "bg-gray-200 text-gray-700"
          } duration-300`}
          onClick={() => handlePackageSelect("rent")}
        >
          Thuê timeshare của bạn
        </button>
        <button
          className={`rounded-b-lg md:rounded-r-lg md:rounded-bl-none w-full md:w-80 px-4 py-2 ${
            selectedPackage === "exchange"
              ? "bg-sky-500 text-white hover:bg-sky-600"
              : "bg-gray-200 text-gray-700"
          } duration-300`}
          onClick={() => handlePackageSelect("exchange")}
        >
          Trao đổi timeshare của bạn
        </button>
      </div>

      {/* Conditionally render the package details based on selectedPackage */}
      {selectedPackage === "rent" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 md:p-8 lg:px-24">
          {/* Rent timeshare packages */}
          <div className="flex flex-col justify-between text-sky-500 px-6 min-h-[645px] p-4 border rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-2">
            <div>
              <div className="flex flex-col">
                <button className="mt-4 px-8 py-2 bg-sky-500 text-white rounded-xl text-lg w-[200px]">
                  Gói Cơ Bản
                </button>
                <span className="font-semibold mt-3">
                  Thời lượng bài đăng trong vòng 6 tháng
                </span>
              </div>
              <p className="mt-4">
                (DIY) Unwind sẽ hỗ trợ quảng cáo và đưa người thuê đến với bạn.
                Cá nhân bạn sẽ hoàn thiện các hợp đồng và chi tiết.
              </p>
              <div className="py-8">
                <p className="border-b-2 border-sky-400 flex items-center">
                  <h3 className="text-2xl font-semibold mb-2">149,000 đ</h3>
                  /tháng
                </p>
                <div className="space-y-4 py-6 text-lg p-4">
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Thông báo qua mail khi có
                    người thuê
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Gắn thẻ “Bài mới” trong 30
                    ngày
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between text-white bg-sky-500 px-6 min-h-[645px] p-4 border rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-2">
            <div>
              <div className="flex flex-col">
                <button className="mt-4 px-8 py-2 bg-white text-sky-500 rounded-xl text-lg w-[200px]">
                  Gói Nâng Cao
                </button>
                <span className="font-semibold mt-3">
                  Thời lượng bài đăng trong vòng 6 tháng
                </span>
              </div>

              <p className="mt-4">
                (DIY) Sử dụng hệ thống đặt chỗ trực tuyến của Unwind để tăng khả
                năng tiếp cận người thuê.
              </p>
              <div className="py-8">
                <p className="border-b-2 border-white flex items-center">
                  <h3 className="text-2xl font-semibold mb-2">199,000 đ</h3>
                  /tháng
                </p>
                <div className="space-y-4 py-6 text-lg p-4">
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Thông báo qua mail khi có
                    người thuê
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Gắn thẻ “Bài mới” trong 30
                    ngày
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Gán cờ “Được xác minh” bởi
                    Unwind
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Thanh toán trực tuyến qua hệ
                    thống
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between text-sky-500 px-6 min-h-[645px] p-4 border rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-2">
            <div>
              <div className="flex flex-col">
                <button className="mt-4 px-8 py-2 bg-sky-500 text-white rounded-xl text-lg w-[200px]">
                  Gói Premium
                </button>
                <span className="font-semibold mt-3">
                  Thời lượng bài đăng đến khi được thuê
                </span>
              </div>
              <p className="mt-4">
                (DIY) Sử dụng hệ thống đặt chỗ trực tuyến của Unwind, hỗ trợ
                định giá tốt nhất để có mức giá hợp lí và dễ tiếp cận người
                thuê.
              </p>
              <div className="py-8">
                <p className="border-b-2 border-sky-400 flex items-center">
                  <h3 className="text-2xl font-semibold mb-2">239,000 đ</h3>
                  /tháng
                </p>
                <div className="space-y-4 py-6 text-lg p-4">
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Thông báo qua mail khi có
                    người thuê
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Gắn thẻ “Bài mới” trong 30
                    ngày
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Gán cờ “Được xác minh” bởi
                    Unwind
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Thanh toán trực tuyến qua hệ
                    thống
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Hỗ trợ định giá cho thuê
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Hỗ trợ quản lí phòng và liên
                    lạc
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between text-white bg-sky-500 px-6 min-h-[645px] p-4 border rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-2">
            <div>
              <div className="flex flex-col">
                <button className="mt-4 px-8 py-2 bg-white text-sky-500 rounded-xl text-lg w-[200px]">
                  Gói Ủy quyền
                </button>
                <span className="font-semibold mt-3">
                  Thời lượng bài đăng đến khi được thuê
                </span>
              </div>
              <p className="mt-4">
                Unwind sẽ hỗ trợ từng bước - từ đăng bài, quảng cáo đến thỏa
                thuận cho thuê và thanh toán.
              </p>
              <div className="py-8">
                <p className="border-b-2 border-white flex items-center">
                  <h3 className="text-2xl font-semibold mb-2">599,000 đ</h3>
                  /tháng
                </p>
                <div className="space-y-4 py-6 text-lg p-4">
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Thông báo qua mail khi có
                    người thuê
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Gắn thẻ “Bài mới” trong 30
                    ngày
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Gán cờ “Được xác minh” của
                    Unwind
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Thanh toán trực tuyến qua hệ
                    thống
                  </p>
                  <p className="flex gap-4">
                    <CheckIcon className="w-7" /> Quy đổi quyền sỡ hưu và thu
                    lại lợi nhuận
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPackage === "exchange" && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4 md:p-8 lg:px-24">
            {/* Exchange timeshare packages */}
            <div className="flex flex-col justify-between w-full text-sky-500 px-6 min-h-[645px] p-4 border rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-2">
              <div>
                <button className="mt-4 px-8 py-2 bg-sky-500 text-white rounded-xl text-lg">
                  Gói Cơ Bản
                </button>
                <p className="mt-4">
                  Chọn một gói để trao đổi timeshare. Bạn sẽ có thể thêm thông
                  tin chi tiết về timeshare của mình, bắt đầu tìm kiếm và trao
                  đổi timeshare phù hợp với bản thân với các thành viên khác.
                </p>
                <div className="py-8">
                  <p className="border-b-2 border-sky-400 flex items-center">
                    <h3 className="text-2xl font-semibold mb-2">159,000 đ</h3>
                    /tháng
                  </p>
                  <div className="space-y-4 py-6 text-lg p-4">
                    <p className="flex gap-4">
                      <CheckIcon className="w-7" />
                      Tìm kiếm và trao đổi timeshare
                    </p>
                    <p className="flex gap-4">
                      <CheckIcon className="w-7" />
                      Đảm bảo an toàn thông tin trao đổi
                    </p>
                    <p className="flex gap-4">
                      <CheckIcon className="w-7" />
                      Không giới hạn số lượng yêu cầu
                    </p>
                    <p className="flex gap-4">
                      <CheckIcon className="w-7" />
                      Gửi và nhận yêu cầu trao đổi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between w-full text-white bg-sky-500 px-6 min-h-[645px] p-4 border rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-2">
              <div>
                <button className="mt-4 px-8 py-2 bg-white text-sky-500 rounded-xl text-lg">
                  Gói Nâng Cao
                </button>
                <p className="mt-4">
                  Chọn một gói để trao đổi timeshare. Bạn sẽ có thể thêm thông
                  tin chi tiết về timeshare của mình, bắt đầu tìm kiếm và trao
                  đổi timeshare phù hợp với bản thân với các thành viên khác.
                </p>
                <div className="py-8">
                  <p className="border-b-2 border-sky-400 flex items-center">
                    <h3 className="text-2xl font-semibold mb-2">219,000 đ</h3>
                    /tháng
                  </p>
                  <div className="space-y-4 py-6 text-lg p-4">
                    <p className="flex gap-4">
                      <CheckIcon className="w-7" />
                      Tìm kiếm và trao đổi timeshare
                    </p>
                    <p className="flex gap-4">
                      <CheckIcon className="w-7" />
                      Đảm bảo an toàn thông tin trao đổi
                    </p>
                    <p className="flex gap-4">
                      <CheckIcon className="w-7" />
                      Không giới hạn số lượng yêu cầu
                    </p>
                    <p className="flex gap-4">
                      <CheckIcon className="w-7" />
                      Gửi và nhận yêu cầu trao đổi
                    </p>
                    <p className="flex gap-4">
                      <CheckIcon className="w-7" />
                      Xác thực bài trao đổi
                    </p>
                    <p className="flex gap-4">
                      <CheckIcon className="w-7" />
                      Xác thực yêu cầu trao đổi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperiencePackage;
