import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaEdit, FaMap, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { FaLocationPin, FaPencil, FaXmark } from "react-icons/fa6";
import {
  acceptNewPriceValuation,
  getRentalPostingById,
} from "../../../service/systemStaffService/systemStaffAPI";
import SpinnerWaiting from "../../LoadingComponent/spinnerWaiting";
import FormatCurrency from "../../Validate/formatCurrency";
const DetailRentalList = ({ isOpen, onClose, postingId, flag }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [newPriceValuation, setNewPriceValuation] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [rentalPosting, setRentalPosting] = useState(null);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchRentalPostingDetail = async () => {
      try {
        let data = await getRentalPostingById(postingId);
        if (data.status === 200) {
          setRentalPosting(data.data);
          setNewPriceValuation(data.data.priceValuation);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchRentalPostingDetail();
  }, [postingId, reload]);

  if (!isVisible) return null;

  const modalStyles = isOpen
    ? {}
    : {
        opacity: 0,
        transform: "translateX(100%)",
        transition: "all 0.3s ease",
      };

  const getStatusStyles = (status) => {
    switch (status) {
      case "PendingApproval":
        return {
          label: "Đang chờ",
          style: "bg-blue-100 text-blue-500",
          styleDot: "bg-blue-500",
        };
      case "Processing":
        return {
          label: "Đã duyệt",
          style: "bg-green-100 text-green-500",
          styleDot: "bg-green-500",
        };
      case "AwaitingConfirmation":
        return {
          label: "Chờ xác nhận giá",
          style: "bg-orange-100 text-orange-500",
          styleDot: "bg-orange-500",
        };
      case "PendingPricing":
        return {
          label: "Chờ định giá",
          style: "bg-orange-100 text-orange-500",
          styleDot: "bg-orange-500",
        };
      case "Closed":
        return {
          label: "Từ chối",
          style: "bg-yellow-100 text-yellow-500",
          styleDot: "bg-yellow-500",
        };
      case "Expired":
        return {
          label: "Hết hạn",
          style: "bg-red-100 text-red-500",
          styleDot: "bg-red-500",
        };
      case "RejectPrice":
        return {
          label: "Từ chối giá",
          style: "bg-red-100 text-red-500",
          styleDot: "bg-red-500",
        };
      case "Completed":
        return {
          label: "Đã thuê",
          style: "bg-blue-100 text-blue-500",
          styleDot: "bg-blue-500",
        };
      default:
        return {
          label: "Không xác định",
          style: "bg-gray-100 text-gray-500",
          styleDot: "bg-gray-500",
        };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSpinner(true);
      let data = await acceptNewPriceValuation(
        postingId,
        parseFloat(newPriceValuation)
      );
      if (data.status === 200) {
        setReload(!reload);
        toast.success("Định giá thành công!", { duration: 3000 });
        flag();
        setEditFlag(false);
        setIsSpinner(false);
      }
    } catch (error) {
      throw error;
    } finally {
      setEditFlag(false);
      setIsSpinner(false);
      onClose()
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end p-3 h-full"  style={{ zIndex: 1000, ...modalStyles }}>
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-full flex flex-col"
        style={{ zIndex: 1000, ...modalStyles }}
      >
        {/* Header Section */}
        <div className="p-5 border-b flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg shadow-md">
          <h1 className="text-lg font-semibold tracking-wide">
            <span className="bg-white/20 py-1 px-3 rounded-md">
              Thông tin chi tiết
            </span>
          </h1>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-2 rounded-full bg-white/20 hover:bg-white/30 transition duration-200"
            aria-label="Close"
          >
            <FaXmark size={24} className="text-white" />
          </button>
        </div>

        {rentalPosting ? (
          <>
            <div className="border-b">
              <div className="flex items-center p-4 m-3 border border-gray-200 rounded-lg shadow-md transition duration-200 relative bg-white">
                <img
                  src={
                    rentalPosting.resortImage
                      ? rentalPosting.resortImage
                      : "https://cdn5.redweek.com/photos/full-preview/3/0/3/303804.jpg?1"
                  }
                  alt="Hotel Thumbnail"
                  className="w-24 h-24 rounded-lg mr-4 object-cover shadow-sm"
                />
                <div className="flex justify-between items-start w-full gap-6">
                  <div className="w-2/3">
                    <h2 className="text-lg text-gray-800 font-semibold mb-1">
                      {rentalPosting.resortName}
                    </h2>
                    <div className="flex items-center text-blue-500 text-sm mt-1">
                      <FaLocationPin size={18} color="red" className="mr-2" />
                      <p>{rentalPosting.location.displayName}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-100 px-4 py-1 font-medium text-red-500 rounded-full whitespace-nowrap shadow-sm text-sm">
                      Yêu cầu hỗ trợ
                    </span>
                  </div>
                </div>

                {/* Status label at the bottom-right with circular indicator */}
                <span
                  className={`absolute bottom-2 right-2 flex items-center px-3 py-1 font-medium text-sm ${
                    getStatusStyles(rentalPosting.status).style
                  } rounded-full shadow-md`}
                >
                  <span
                    className={`inline-block w-2.5 h-2.5 mr-1 ${
                      getStatusStyles(rentalPosting.status).styleDot
                    } rounded-full`}
                  ></span>
                  {getStatusStyles(rentalPosting.status).label}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-700">
                Thông tin
              </h2>
              <div className="grid grid-cols-4 gap-4 mb-6 mr-6 px-6 p-2">
                <p className="text-medium font-mono text-gray-500 mr-4">
                  Tên phòng:{" "}
                </p>
                <p className="font-medium text-left">
                  {rentalPosting.roomName}
                </p>

                <p className="text-medium font-mono text-gray-500 mr-4">
                  Đăng bởi:{" "}
                </p>

                <p className="font-mono">{rentalPosting.ownerName}</p>

                <p className="text-medium font-mono text-gray-500 mr-4">
                  Ngày nhận phòng:{" "}
                </p>
                <p className="font-mono text-left">
                  {rentalPosting.checkinDate}
                </p>

                <p className="text-medium font-mono text-gray-500 mr-4">
                  Ngày trả phòng:{" "}
                </p>
                <p className=" ">{rentalPosting.checkoutDate}</p>

                <p className="text-medium font-mono text-gray-500 mr-4">
                  Giá phòng:{" "}
                </p>
                <p className=" text-left font-mono">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(rentalPosting.totalPrice)}
                </p>

                <p className="text-medium font-mono text-gray-500 mr-4">
                  Định giá:{" "}
                </p>

                {rentalPosting.status === "PendingPricing" ? (
                  <p>
                    {editFlag ? (
                      <p className="flex items-center gap-4">
                        <div className="relative">
                          <input
                            className="w-32 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                            onChange={(e) =>
                              setNewPriceValuation(e.target.value)
                            }
                            type="text"
                            name="newPriceValuation"
                            value={newPriceValuation}
                            placeholder="Nhập giá"
                          />
                          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400">
                            VNĐ
                          </span>
                        </div>
                        <FaEdit
                          onClick={() => setEditFlag(false)}
                          size={24}
                          className="cursor-pointer text-[#EE6457] hover:scale-110 transition-transform duration-200"
                        />
                      </p>
                    ) : (
                      <p className="flex justify-start items-center gap-4">
                        <p className="font-mono">
                          {FormatCurrency(newPriceValuation)}
                        </p>
                        <FaEdit
                          onClick={() => setEditFlag(true)}
                          size={24}
                          color="#2D99AE"
                        />
                      </p>
                    )}
                  </p>
                ) : (
                  <p className="font-mono">
                    {FormatCurrency(newPriceValuation)}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <h2 className="text-xl text-gray-700 font-semibold mb-3">
                  Mô tả
                </h2>
                <p className="text-medium text-gray-600 p-2">
                  {rentalPosting.resortDescription}
                </p>
              </div>

              <div className="flex flex-col items-center overflow-y-auto p-6 bg-gray-50 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
                  Thông tin phòng
                </h2>
                <div className="w-full mb-6">
                  <img
                    src={rentalPosting.unitType.photos}
                    alt={rentalPosting.unitType.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Thông tin chi tiết phòng */}
                <div className="w-full p-4 bg-white rounded-lg shadow-md text-gray-700">
                  {/* Tiêu đề */}
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Thông tin chi tiết phòng
                  </h3>

                  {/* Grid thông tin chi tiết */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 p-4">
                    <div className="flex items-center">
                      <p className="font-semibold text-gray-500">Loại phòng:</p>
                      <p className="ml-2 font-medium">
                        {rentalPosting.unitType.title}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="font-semibold text-gray-500">Diện tích:</p>
                      <p className="ml-2 font-medium">
                        {rentalPosting.unitType.area}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="font-semibold text-gray-500">
                        Số phòng tắm:
                      </p>
                      <p className="ml-2 font-medium">
                        {rentalPosting.unitType.bathrooms}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="font-semibold text-gray-500">Số giường:</p>
                      <p className="ml-2 font-medium">
                        {rentalPosting.unitType.bedsQueen} Queen,{" "}
                        {rentalPosting.unitType.bedsTwin} Twin
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="font-semibold text-gray-500">Bếp:</p>
                      <p className="ml-2 font-medium">
                        {rentalPosting.unitType.kitchen}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="font-semibold text-gray-500">
                        Số khách tối đa:
                      </p>
                      <p className="ml-2 font-medium">
                        {rentalPosting.unitType.sleeps}
                      </p>
                    </div>
                    {/* Mô tả chi tiết */}
                    <div className="flex items-center col-span-2">
                      <p className="font-semibold text-gray-500">Mô tả:</p>
                      <p className="ml-2 font-medium">
                        {rentalPosting.unitType.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4 text-gray-700 mt-6">
                <h2 className="text-lg font-semibold mb-3">
                  Các tiện năng và tiện nghi tại chỗ
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {rentalPosting.resortAmenities
                    .filter((amenity) => amenity.type === "AMENITIES")
                    .map((amenity) => (
                      <p
                        key={amenity.id}
                        className="text-medium flex gap-4  items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:mr-2 before:bg-blue-500 before:rounded-full"
                      >
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        {amenity.name}
                      </p>
                    ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4 text-gray-700">
                <h2 className="text-lg font-semibold mb-4">
                  Các điểm tham quan gần đó
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {rentalPosting.resortAmenities
                    .filter((amenity) => amenity.type === "NEARBY ATTRACTIONS")
                    .map((amenity) => (
                      <p
                        key={amenity.id}
                        className="text-medium flex gap-4  items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:mr-2 before:bg-blue-500 before:rounded-full"
                      >
                        {amenity.name}
                      </p>
                    ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4 text-gray-700">
                <h2 className="text-lg font-semibold mb-4">Chính sách</h2>
                <div className="grid grid-cols-3 gap-2">
                  {rentalPosting.resortAmenities
                    .filter((amenity) => amenity.type === "POLICY")
                    .map((amenity) => (
                      <p
                        key={amenity.id}
                        className="text-medium gap-4 flex items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:mr-2 before:bg-blue-500 before:rounded-full"
                      >
                        {amenity.name}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <SpinnerWaiting />
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
          {rentalPosting && rentalPosting.status === "PendingPricing" && (
            <div className="border-t flex justify-end items-center gap-4">
              {isSpinner ? (
                <button className="bg-green-500 text-white px-8 py-2 rounded-xl hover:bg-green-600 transition duration-150">
                  <FaSpinner className="animate-spin" size={24} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-8 py-2 rounded-xl hover:bg-green-600 transition duration-150"
                >
                  Xác nhận
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailRentalList;
