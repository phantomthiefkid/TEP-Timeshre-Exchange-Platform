import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaEdit, FaMap, FaMapMarkerAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
const DetailRentalList = ({ isOpen, onClose, postingId }) => {
  const [isVisible, setIsVisible] = useState(false);
  console.log(postingId)
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const modalStyles = isOpen
    ? {}
    : {
      opacity: 0,
      transform: "translateX(100%)",
      transition: "all 0.3s ease",
    };

  return (
    <div className="fixed inset-0 flex justify-end p-3 h-full">
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl h-full flex flex-col"
        style={{ zIndex: 1000, ...modalStyles }}
      >
        {/* Header Section */}
        <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <h1 className="text-xl font-bold tracking-wider">Thông tin chi tiết</h1>
          <div className="flex items-center">
            <div className="bg-white border border-gray-300 rounded-xl p-2 mr-2 hover:bg-gray-100 cursor-pointer shadow-sm">
              <button className="text-gray-500 focus:outline-none flex items-center">
                <FaEdit size={20} className="mr-2 text-blue-600" />
                <span>Chỉnh sửa</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition duration-200"
            >
              <FaXmark size={28} />
            </button>
          </div>
        </div>


        {postingId ? (
          <>
            <div className=" border-b">
              <div className="flex items-center p-4 m-3 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition duration-200">
                <img
                  src="https://cdn5.redweek.com/photos/full-preview/3/0/3/303804.jpg?1"
                  alt="Hotel Thumbnail"
                  className="w-20 h-20 rounded-lg mr-4 object-cover"
                />
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{postingId.resortName}</h2>
                    <div className="flex items-center text-blue-500">
                      <FaMap className="mr-2" />
                      <p>{postingId.address}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    {postingId.status}
                  </span>
                </div>
              </div>

            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <h2 className="text-2xl font-semibold mb-3">Chi tiết bài đăng</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <p className="text-medium text-gray-500">Mã đăng bài</p>
                  <p className="font-medium">{postingId.rentalPostingId}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-medium text-gray-500">Đăng bởi</p>
                  <div className="flex flex-row items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPSeKg-xl483vdzvuk5p1Nl89goZRGsrjMA&s"
                      alt="Hotel Thumbnail"
                      className="w-12 h-12 rounded-full mr-4 border border-blue-400"
                    />
                    <p className="font-medium">{postingId.ownerName}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-medium text-gray-500">Ngày nhận phòng</p>
                  <p className="font-medium">{postingId.checkinDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-medium text-gray-500">Ngày trả phòng</p>
                  <p className="font-medium">{postingId.checkoutDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-medium text-gray-500">Giá phòng</p>
                  <p className="font-medium">{postingId.totalPrice} VND</p>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-3">Mô tả</h2>
                <p className="text-medium">{postingId.resortDescription}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
                <h2 className="text-xl font-semibold mb-3">Các tiện năng và tiện nghi tại chỗ</h2>
                <div className="grid grid-cols-3 gap-4">
                  {postingId.resortAmenities
                    .filter((amenity) => amenity.type === "1")
                    .map((amenity) => (
                      <p key={amenity.id} className="text-gray-700 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        {amenity.name}
                      </p>
                    ))}
                </div>
              </div>


              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
                <h2 className="text-2xl font-semibold mb-4">Các điểm tham quan gần đó</h2>
                <div className="grid grid-cols-3 gap-2">
                  {postingId.resortAmenities
                    .filter((amenity) => amenity.type === "2")
                    .map((amenity) => (
                      <p key={amenity.id} className="text-medium">
                        {amenity.name}
                      </p>
                    ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
                <h2 className="text-2xl font-semibold mb-4">Chính sách</h2>
                <div className="grid grid-cols-3 gap-2">
                  {postingId.resortAmenities
                    .filter((amenity) => amenity.type !== "1" && amenity.type !== "2")
                    .map((amenity) => (
                      <p key={amenity.id} className="text-medium">
                        {amenity.name}
                      </p>
                    ))}
                </div>
              </div>


              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-3">Địa chỉ</h2>
                <img
                  src="https://placehold.co/600x300"
                  className="max-w-full "
                />
              </div>
            </div>
          </>
        ) : (
          <p>Đang tải...</p>
        )}


        {/* Footer Section with Buttons */}
        <div className="p-4 border-t flex justify-between">
          <div>
            <button
              className="text-gray-700 px-4 py-2 rounded-lg mr-2 border border-gray-500 hover:bg-gray-200 transition duration-150"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
          <div className="border-t flex justify-end">
            <button className="border border-red-500 text-red-500 px-4 py-2 rounded-xl mr-2 hover:bg-red-500 hover:text-white transition duration-150">
              Từ chối
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition duration-150">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRentalList;
