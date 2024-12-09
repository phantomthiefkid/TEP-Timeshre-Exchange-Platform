import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaChevronLeft,
  FaChevronRight,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaArrowsRotate, FaEllipsisVertical } from "react-icons/fa6";
import DetailCheckinModal from "../../components/Modal/detailCheckinModal";
import {
  getAllBooking,
  getExchangeBookingById,
  getRentalBookingById,
} from "../../service/tsStaffService/tsStaffAPI";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import CountUp from "react-countup";

const RentalListManagement = () => {
  const [selectedDateTab, setSelectedDateTab] = useState("today");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [allBooking, setAllBooking] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isComing, setIsComing] = useState(false);
  const [willGo, setWillGo] = useState(false);
  const [checkInCount, setCheckInCount] = useState(0);
  const [checkOutCount, setCheckOutCount] = useState(0);
  const [bookedCount, setBookedCount] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchAllBooking = async () => {
    try {
      let data = await getAllBooking(page, size, isComing, willGo);
      if (data.status === 200) {
        setAllBooking(data.data.content);
        console.log(data.data.content)
        setTotalPages(data.data.totalPages);
        if (isComing === false && willGo === false) {
          setBookedCount(
            data.data.content.filter((b) => b.status === "Booked").length
          );
          setCheckInCount(
            data.data.content.filter((b) => b.status === "CheckIn").length
          );
          setCheckOutCount(
            data.data.content.filter((b) => b.status === "CheckOut").length
          );
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookingDetails = async (bookingId, source) => {
    try {
      let response;
      if (source === "rental") {
        response = await getRentalBookingById(bookingId);
      } else if (source === "exchange") {
        response = await getExchangeBookingById(bookingId);
      }

      setSelectedBooking(response.data);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Booked":
        return {
          label: "Đang chờ",
          style: "bg-yellow-100 text-yellow-500 font-semibold ",
        };
      case "CheckIn":
        return {
          label: "Đã nhận phòng",
          style: "bg-green-100 text-green-500 font-semibold",
        };
      case "CheckOut":
        return {
          label: "Đã trả phòng",
          style: "bg-red-100 text-red-500 font-semibold",
        };
      default:
        return {
          label: "Không xác định",
          style: "bg-gray-100 text-gray-500 font-semibold",
        };
    }
  };
  const tabConfig = {
    today: { isComing: false, willGo: false },
    willGo: { isComing: false, willGo: true },
    isComing: { isComing: true, willGo: false },
  };

  const handleDateTabClick = (tab) => {
    setSelectedDateTab(tab);
    const { isComing, willGo } = tabConfig[tab];
    setIsComing(isComing);
    setWillGo(willGo);
    setPage(0);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <SpinnerWaiting />;
  }

  useEffect(() => {
    fetchAllBooking();
  }, [selectedDateTab, page, isComing, willGo]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="flex justify-between items-center py-4 px-6 mb-6 bg-gray-50 rounded-lg shadow-lg">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-700">
              Danh sách <span className="text-blue-600">Thuê</span>
            </h1>
            <h3 className="text-lg text-gray-500">
              Theo dõi và quản lý các{" "}
              <span className="font-semibold text-blue-600">yêu cầu thuê</span>{" "}
              của khách hàng.
            </h3>
          </div>
          <button
            className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg px-6 py-3 font-medium shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
            onClick={() => fetchAllBooking()}
          >
            <FaArrowsRotate className="mr-3 text-lg" />
            Làm mới
          </button>
        </div>

        {/* Dashboard */}
        <div className="flex justify-center items-center bg-white mb-3">
          {/* Check In */}
          <div className="flex flex-col justify-center w-[480px] h-32 bg-gradient-to-r from-cyan-400 to-blue-300 text-white border-2 shadow-md rounded-lg p-4 m-4">
            <div className="flex items-center justify-between w-full">
              <div className="text-4xl font-bold text-white">
                <CountUp end={checkInCount} duration={1.5} />
              </div>
              <div className="text-3xl">
                <FaCalendarCheck />
              </div>
            </div>
            <div className="text-xl font-semibold mt-4 text-left">
              Nhận phòng
            </div>
          </div>

          {/* Check Out */}
          <div className="flex flex-col justify-center w-[480px] h-32 bg-gradient-to-r from-lime-400 to-orange-400 text-white border-2 shadow-md rounded-lg p-4 m-4">
            <div className="flex items-center justify-between w-full">
              <div className="text-4xl font-bold text-white">
                <CountUp end={checkOutCount} duration={1.5} />
              </div>
              <div className="text-3xl">
                <FaSignOutAlt />
              </div>
            </div>
            <div className="text-xl font-semibold mt-4 text-left">
              Trả phòng
            </div>
          </div>

          {/* Booked */}
          <div className="flex flex-col justify-center w-[480px] h-32 bg-gradient-to-r from-red-400 to-indigo-500 text-white border-2 shadow-md rounded-lg p-4 m-4">
            <div className="flex items-center justify-between w-full">
              <div className="text-4xl font-bold text-white">
                <CountUp end={bookedCount} duration={1.5} />
              </div>
              <div className="text-3xl">
                <FaCalendarAlt />
              </div>
            </div>
            <div className="text-xl font-semibold mt-4 text-left">Đang chờ</div>
          </div>
        </div>
        {/* Day Fitler */}
        <div className="flex justify-start space-x-2 mb-1">
          <button
            className={`px-4 py-2 text-black font-semibold bg-white transition-all duration-300 ease-out relative ${
              selectedDateTab === "isComing" ? "text-blue-500" : "text-black"
            }`}
            onClick={() => handleDateTabClick("isComing")}
          >
            Sẽ đến
            {selectedDateTab === "isComing" && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 mt-1"></span>
            )}
          </button>
          <button
            className={`px-4 py-2 text-black font-semibold bg-white transition-all duration-300 ease-out relative ${
              selectedDateTab === "today" ? "text-blue-500" : "text-black"
            }`}
            onClick={() => handleDateTabClick("today")}
          >
            Hôm nay
            {selectedDateTab === "today" && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 mt-1"></span>
            )}
          </button>
          <button
            className={`px-4 py-2 text-black font-semibold bg-white transition-all duration-300 ease-out relative ${
              selectedDateTab === "willGo" ? "text-blue-500" : "text-black"
            }`}
            onClick={() => handleDateTabClick("willGo")}
          >
            Sẽ đi
            {selectedDateTab === "willGo" && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 mt-1"></span>
            )}
          </button>
        </div>

        {/* Bookings Table */}
        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="p-4 text-left ml-3">Thông tin khách hàng</th>
              <th className="p-4 text-left">Loại phòng</th>
              <th className="p-4 text-left">Số đêm</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-center ">Check in/out</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>
          {loading ? (
            <SpinnerWaiting />
          ) : (
            <tbody>
              {allBooking.map((booking, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 flex items-center w-72">
                    <img
                      src={booking.renterLegalAvatar}
                      className="w-12 h-12 rounded-2xl mr-5"
                      alt={booking.renterFullLegalName}
                    />
                    <div className="flex flex-col">
                      <h3 className="font-semibold flex flex-row">
                        {booking.renterFullLegalName}
                      </h3>
                      <p className="text-sm text-blue-400">
                        {booking.renterLegalPhone}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">{booking.unitTypeTitle}</td>
                  <td className="p-4 pl-8">{booking.nights}</td>
                  <td className="p-4">
                    <span
                      className={`text-medium px-2 py-1 w-3/4 text-center rounded-full ${
                        getStatusStyles(booking.status).style
                      }`}
                    >
                      {getStatusStyles(booking.status).label}
                    </span>
                  </td>
                  <td className="p-4">
                    {booking.status === "Booked" ? null : booking.status ===
                      "CheckIn" ? (
                      <div className="flex justify-evenly">
                        <img
                          src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986050405_checkin.png"
                          alt="Check-in"
                          className="w-6 h-6"
                        />
                      </div>
                    ) : booking.status === "CheckOut" ? (
                      <div className="flex justify-evenly items-center">
                        <img
                          src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986050405_checkin.png"
                          alt="Check-in"
                          className="w-6 h-6 mr-2"
                        />
                        <img
                          src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986050843_checkout.png"
                          alt="Check-out"
                          className="w-6 h-6"
                        />
                      </div>
                    ) : null}
                  </td>
                  <td className="p-4">
                    <div
                      className="cursor-pointer hover:bg-gray-100 rounded-xl w-8 h-8 p-2"
                      onClick={() => {
                        fetchBookingDetails(booking.bookingId, booking.source);
                      }}
                    >
                      <FaEllipsisVertical />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {/* Pagination */}
        {allBooking && allBooking.length > 0 ? (
          <div className="flex justify-between items-center p-6">
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              <FaChevronLeft />
            </button>

            <div className="flex space-x-2 bg-white px-2 py-1">
              {page > 2 && (
                <>
                  <button
                    onClick={() => setPage(0)}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-blue-500"
                  >
                    1
                  </button>
                  <span className="flex items-center justify-center text-gray-500">
                    ...
                  </span>
                </>
              )}

              {Array.from({ length: totalPages }, (_, index) => {
                if (index >= page - 2 && index <= page + 2) {
                  return (
                    <button
                      key={index}
                      onClick={() => setPage(index)}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl ${
                        index === page
                          ? "bg-blue-500 text-white shadow-lg font-semibold"
                          : "text-gray-500 hover:text-blue-500 hover:font-semibold"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                }
                return null;
              })}

              {page < totalPages - 3 && (
                <>
                  <span className="flex items-center justify-center text-gray-500">
                    ...
                  </span>
                  <button
                    onClick={() => setPage(totalPages - 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-blue-500"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={page === totalPages - 1}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              <FaChevronRight />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-5 w-full min-h-[370px] border-2 border-dashed border-gray-300 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100">
            <FaList className="text-gray-400 text-6xl animate-pulse mb-4" />
            <span className="text-gray-600 text-lg font-medium">
              Không có yêu cầu cho thuê nào có sẵn
            </span>
          </div>
        )}

        <DetailCheckinModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          bookingId={selectedBooking}
          onSave={fetchAllBooking}
        />
      </div>
    </>
  );
};

export default RentalListManagement;
