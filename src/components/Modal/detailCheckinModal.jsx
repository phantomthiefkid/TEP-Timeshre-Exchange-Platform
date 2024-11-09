import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaDotCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import SpinnerWaiting from "../LoadingComponent/spinnerWaiting";
import {
  onChangeExchangeBookingById,
  onChangeRentalBookingById,
} from "../../service/tsStaffService/tsStaffAPI";

const DetailCheckinModal = ({ isOpen, onClose, bookingId, onSave }) => {
  if (!isOpen) return null;

  const { source } = bookingId;

  const date = new Date();
  const checkInDate = parseDate(bookingId.checkinDate);
  const isComingDate = checkInDate > date;

  const [status, setStatus] = useState(bookingId.status);
  const [isCheckInFlag, setIsCheckInFlag] = useState(false);
  const [isCheckOutFlag, setIsCheckOutFlag] = useState(false);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Booked":
        return { label: "Đang chờ", style: "bg-yellow-100 text-yellow-500" };
      case "CheckIn":
        return { label: "Đã nhận phòng", style: "bg-green-100 text-green-500" };
      case "CheckOut":
        return {
          label: "Đã trả phòng",
          style: "bg-red-100 text-red-500",
        };
      default:
        return { label: "Không xác định", style: "bg-gray-100 text-gray-500" };
    }
  };

  const modalStyles = isOpen
    ? {}
    : {
        opacity: 0,
        transform: "translateX(100%)",
        transition: "all 0.3s ease",
      };

  const handleOnChangeStatus = async (e, source) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    let checkInFlag = false;
    let checkOutFlag = false;

    if (newStatus === "CheckIn") {
      checkInFlag = true;
    } else if (newStatus === "CheckOut") {
      checkOutFlag = true;
    }

    setIsCheckInFlag(checkInFlag);
    setIsCheckOutFlag(checkOutFlag);

    try {
      let response;
      const data = {
        checkIn: checkInFlag,
        checkOut: checkOutFlag,
      };

      if (source === "rental") {
        response = await onChangeRentalBookingById(bookingId.id, data);
      } else if (source === "exchange") {
        response = await onChangeExchangeBookingById(bookingId.id, data);
      }

      if (response && response.data) {
        setStatus(response.data.status);
        toast.success("Trạng thái đã được cập nhật!");
        onSave();
        onClose();
      } else {
        toast.error("Không thể cập nhật trạng thái.");
      }
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end p-3 h-full">
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl flex flex-col"
        style={{ zIndex: 1000, ...modalStyles }}
      >
        <h2 className="text-2xl font-semibold mb-8">Thông tin chi tiết</h2>

        <button
          onClick={onClose}
          className="absolute top-7 right-7 text-gray-500 hover:text-zinc-300 focus:outline-none"
        >
          <FaXmark size={28} />
        </button>

        {bookingId && source === "rental" ? (
          <>
            <div className="mb-0 ">
              <div className="flex items-center p-4 border rounded-lg shadow-sm w-full mb-6">
                <img
                  src="https://placehold.co/100x100"
                  className="w-24 h-24 rounded-lg object-cover"
                  alt="Room Thumbnail"
                />
                <div className="ml-4 flex-grow">
                  <div className="space-y-1">
                    <h2 className="text-base font-medium">Mã đặt phòng</h2>
                    <p className="text-lg font-medium">{bookingId.id}</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <img
                      src={bookingId.renterLegalAvatar}
                      className="w-12 h-12 rounded-full object-cover border border-blue-100"
                      alt="Customer Thumbnail"
                    />
                    <div className="ml-2">
                      <p className="text-sm font-medium">
                        {bookingId.renterFullLegalName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {bookingId.renterLegalPhone}
                      </p>
                    </div>
                  </div>
                </div>
                {bookingId.status === "Booked" && isComingDate ? (
                  <select
                    className="rounded-xl border border-gray-300 bg-gray-50 text-gray-700 p-3 min-w-[150px] hover:bg-gray-100 focus:border-blue-500 focus:outline-none transition ease-in-out duration-200"
                    value={bookingId.status}
                    disabled
                  >
                    <option value="Booked">Đang chờ</option>
                    <option value="CheckIn">Đã nhận phòng</option>
                    <option value="CheckOut">Đã trả phòng</option>
                  </select>
                ) : (
                  <select
                    className="rounded-xl border border-gray-300 bg-gray-50 text-gray-700 p-3 min-w-[150px] hover:bg-gray-100 focus:border-blue-500 focus:outline-none transition ease-in-out duration-200"
                    value={status}
                    onChange={(e) => handleOnChangeStatus(e, source)}
                  >
                    <option value="Booked">Đang chờ</option>
                    <option value="CheckIn">Đã nhận phòng</option>
                    <option value="CheckOut">Đã trả phòng</option>
                  </select>
                )}
              </div>
            </div>

            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-5">Chi tiết cho thuê</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Loại phòng</span>
                  <span>{bookingId.rentalPosting.roomInfo.unitType.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Ngày nhận phòng</span>
                  <span>{bookingId.checkinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Ngày trả phòng</span>
                  <span>{bookingId.checkoutDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Số đêm</span>
                  <span>{bookingId.totalNights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Trạng thái</span>
                  <span
                    className={`flex items-center px-2 py-1 text-center rounded-xl ${
                      getStatusStyles(bookingId.status).style
                    }`}
                  >
                    {getStatusStyles(bookingId.status).label}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-5">
                Thông tin khách hàng
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Tên khách hàng</span>
                  <span>{bookingId.primaryGuestName}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-medium">Thông tin liên lạc</span>
                  <div className="flex flex-col items-end">
                    <span className="mb-3">{bookingId.primaryGuestPhone}</span>
                    <span>{bookingId.primaryGuestEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : source === "exchange" ? (
          <>
            <div className="mb-0 ">
              <div className="flex items-center p-4 border rounded-lg shadow-sm w-full mb-6">
                <img
                  src="https://placehold.co/100x100"
                  className="w-24 h-24 rounded-lg object-cover"
                  alt="Room Thumbnail"
                />
                <div className="ml-4 flex-grow">
                  <h2 className="text-lg font-medium">{bookingId.id}</h2>
                  <div className="flex items-center mt-4">
                    <img
                      src={bookingId.renterLegalAvatar}
                      className="w-12 h-12 rounded-full object-cover border border-blue-100"
                      alt="Customer Thumbnail"
                    />
                    <div className="ml-2">
                      <p className="text-sm font-medium">
                        {bookingId.renterFullLegalName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {bookingId.renterLegalPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {bookingId.status === "Booked" && isComingDate ? (
                  <select
                    className="rounded-xl border border-gray-300 bg-gray-50 text-gray-700 p-3 min-w-[150px] hover:bg-gray-100 focus:border-blue-500 focus:outline-none transition ease-in-out duration-200"
                    value={bookingId.status}
                    disabled
                  >
                    <option value="Booked">Đang chờ</option>
                    <option value="CheckIn">Đã nhận phòng</option>
                    <option value="CheckOut">Đã trả phòng</option>
                  </select>
                ) : (
                  <select
                    className="rounded-xl border border-gray-300 bg-gray-50 text-gray-700 p-3 min-w-[150px] hover:bg-gray-100 focus:border-blue-500 focus:outline-none transition ease-in-out duration-200"
                    value={status}
                    onChange={(e) => handleOnChangeStatus(e, source)}
                  >
                    <option value="Booked">Đang chờ</option>
                    <option value="CheckIn">Đã nhận phòng</option>
                    <option value="CheckOut">Đã trả phòng</option>
                  </select>
                )}
              </div>
            </div>

            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-5">Chi tiết cho thuê</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Loại phòng</span>
                  <span>{bookingId.roomInfo.unitType.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Ngày nhận phòng</span>
                  <span>{bookingId.checkinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Ngày trả phòng</span>
                  <span>{bookingId.checkoutDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Số đêm</span>
                  <span>{bookingId.nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Trạng thái</span>
                  <span
                    className={`flex items-center px-2 py-1 text-center rounded-xl ${
                      getStatusStyles(bookingId.status).style
                    }`}
                  >
                    {getStatusStyles(bookingId.status).label}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-5">
                Thông tin khách hàng
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Tên khách hàng</span>
                  <span>{bookingId.primaryGuestName}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-medium">Thông tin liên lạc</span>
                  <div className="flex flex-col items-end">
                    <span className="mb-3">{bookingId.primaryGuestPhone}</span>
                    <span>{bookingId.primaryGuestEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <SpinnerWaiting />
        )}

        <div className="mt-auto flex justify-end mt-5">
          <button
            className="bg-blue-500 text-white border border-blue-500 hover:bg-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-300 transition-all duration-300 ease-in-out mr-4 px-4 py-2 rounded"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  return new Date(year, month - 1, day);
};

export default DetailCheckinModal;
