import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaCheck,
  FaClock,
  FaEdit,
  FaExclamation,
  FaExclamationTriangle,
  FaMap,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import RejectRentalPostingModal from "../../Modal/requestPostingModal/rejectRentalPostingModal";
import {
  approveRentalPostingById,
  rejectRentalPostingById,
} from "../../../service/tsStaffService/tsStaffAPI";

const DetailRentalPostingModal = ({ isOpen, onClose, postingId, onSave }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isStaffRefinement, setIsStaffRefinement] = useState(false);
  const [isPriceValuation, setIsPriceValuation] = useState(false);
  const [staffRefinementPrice, setStaffRefinementPrice] = useState("");
  const [priceValuation, setPriceValuation] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
        return { label: "Đang chờ", style: "bg-blue-100 text-blue-500" };
      case "Processing":
        return { label: "Đã duyệt", style: "bg-green-100 text-green-500" };
      case "AwaitingConfirmation":
        return {
          label: "Chờ định giá",
          style: "bg-orange-100 text-orange-500",
        };
      case "PendingPricing":
        return {
          label: "Chờ xác nhận giá",
          style: "bg-orange-100 text-orange-500",
        };
      case "Closed":
        return { label: "Từ chối", style: "bg-yellow-100 text-yellow-500" };
      case "Expired":
        return { label: "Hết hạn", style: "bg-red-100 text-red-500" };
      default:
        return { label: "Không xác định", style: "bg-gray-100 text-gray-500" };
    }
  };

  const handleAccept = async (e) => {
    try {
      await approveRentalPostingById(postingId.rentalPostingId, {
        staffRefinementPrice: staffRefinementPrice,
        note: "",
        priceValuation: priceValuation,
        unitTypeId: 0,
      });
      e.preventDefault();
      onSave();
      toast.success("Chấp nhận bài đăng", { duration: 2000 });
      handleClose();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra", { duration: 2000 });
      return error;
    }
  };

  const handleReject = async (reason) => {
    try {
      await rejectRentalPostingById(reason, postingId.rentalPostingId);
      toast.success("Đã từ chối bài đăng", { duration: 2000 });
      handleClose();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra", { duration: 2000 });
      return error;
    }
  };

  const handleClose = () => {
    setIsEditing(false); // Reset editing state
    onClose(); // Close the modal
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);

      if (postingId) {
        setIsStaffRefinement(postingId.rentalPackageId === 3);
        setIsPriceValuation(postingId.rentalPackageId === 4);
      }
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen, postingId]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-end p-3 h-full">
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => handleClose()}
      ></div>
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl h-full flex flex-col"
        style={{ zIndex: 1000, ...modalStyles }}
      >
        {/* Header Section */}
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold">Thông tin chi tiết</h1>
          <div className="flex items-center">
            <div className="bg-white border-2 border-gray-300 rounded-xl p-2 mr-2 hover:bg-gray-300 cursor-pointer">
              <button className="text-gray-500 focus:outline-none flex flex-row items-center">
                <FaEdit size={20} />
                <span className="ml-2">Chỉnh sửa</span>
              </button>
            </div>

            <button
              onClick={() => handleClose()}
              className="text-gray-500 hover:text-zinc-300 focus:outline-none"
            >
              <FaXmark size={28} />
            </button>
          </div>
        </div>

        {postingId ? (
          <>
            <div className="border-b">
              <div className="flex items-center p-4 m-3 border border-gray-300 rounded-xl">
                <img
                  src="https://placehold.co/100x100"
                  alt="Hotel Thumbnail"
                  className="w-20 h-20 rounded-lg mr-4"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-xl font-bold mb-2">
                        {postingId.resortName}
                      </h2>
                      <div className="flex flex-row">
                        <FaMap
                          className="text-gray-500 mr-2 mt-1"
                          style={{ color: "blue" }}
                        />
                        <p className="text-base text-blue-500 w-3/4">
                          {postingId.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end w-1/3">
                    {/* Updated parent div */}
                    <span
                      className={`text-medium px-2 py-1 w-3/4 text-center rounded-full ${
                        getStatusStyles(postingId.status).style
                      }`}
                    >
                      {getStatusStyles(postingId.status).label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
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
                      src="https://placehold.co/25x25"
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
                  {isStaffRefinement ? (
                    <div className="flex flex-row items-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={staffRefinementPrice}
                          onChange={(e) =>
                            setStaffRefinementPrice(e.target.value)
                          }
                          placeholder="Nhập giá hỗ trợ"
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        <>
                          <div className="text-red-500">
                            <FaExclamationTriangle />
                          </div>
                          <span className="text-red-500 ml-2">
                            Yêu cầu hỗ trợ định giá
                          </span>
                          <div
                            className="bg-white rounded-full ml-3 mr-2 hover:bg-gray-300 cursor-pointer"
                            onClick={() => setIsEditing(true)}
                          >
                            <button className="text-gray-500 focus:outline-none flex flex-row items-center">
                              <FaEdit size={20} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : isPriceValuation ? (
                    <div className="flex flex-row items-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={priceValuation}
                          onChange={(e) => setPriceValuation(e.target.value)}
                          placeholder="Nhập giá định giá"
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        <>
                          <div className="text-orange-500">
                            <FaClock />
                          </div>
                          <span className="text-orange-500 ml-2">
                            Chờ định giá
                          </span>
                          <div
                            className="bg-white rounded-full ml-3 mr-2 hover:bg-gray-300 cursor-pointer"
                            onClick={() => setIsEditing(true)}
                          >
                            <button className="text-gray-500 focus:outline-none flex flex-row items-center">
                              <FaEdit size={20} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(postingId.totalPrice)}{" "}
                        (
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(postingId.pricePerNights)}
                        / đêm)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-3">Mô tả</h2>
                {postingId.resortDescription ? (
                  <p className="text-medium">{postingId.resortDescription}</p>
                ) : (
                  <p className="text-gray-500">Mô tả chi tiết không có sẵn</p>
                )}
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-3">Loại Phòng</h2>
                {postingId.unitType ? (
                  <div className="flex border p-4 rounded-lg shadow-sm">
                    <div className="w-1/4">
                      <img
                        src={postingId.unitType.photos}
                        alt={postingId.unitType.title}
                        className="w-full h-full rounded-lg border border-gray-200"
                      />
                    </div>
                    <div className="w-2/3 pl-5">
                      <div className="flex justify-between">
                        <div className="w-1/2">
                          <h2 className="text-lg font-bold">Thông tin phòng</h2>
                          <h1 className="text-2xl font-bold mt-2">
                            {postingId.unitType.title}
                          </h1>
                        </div>
                        <div className="w-1/2 space-y-2">
                          <h2 className="text-lg font-bold">Đặc điểm phòng</h2>
                          <p>Giường: {postingId.unitType.bedsFull}</p>
                          <p>Phòng tắm: {postingId.unitType.bathrooms}</p>
                          <p>Nhà bếp: {postingId.unitType.kitchen}</p>
                          <p>Số người: {postingId.unitType.sleeps}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Thông tin loại phòng không có sẵn
                  </p>
                )}
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Các tiện năng và tiện nghi tại chỗ
                </h2>
                {postingId.resortAmenities &&
                postingId.resortAmenities.some(
                  (amenity) =>
                    amenity.type === "Các tính năng và tiện nghi tại chỗ"
                ) ? (
                  <div className="grid grid-cols-3 gap-2">
                    {postingId.resortAmenities
                      .filter(
                        (amenity) =>
                          amenity.type === "Các tính năng và tiện nghi tại chỗ"
                      )
                      .map((amenity) => (
                        <p key={amenity.id} className="text-medium">
                          {amenity.name}
                        </p>
                      ))}
                  </div>
                ) : (
                  <p className="text-medium text-gray-500">
                    Tiện ích không có sẵn
                  </p>
                )}
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Các điểm tham quan gần đó
                </h2>
                {postingId.resortAmenities &&
                postingId.resortAmenities.some(
                  (amenity) => amenity.type === "Các điểm tham quan gần đó"
                ) ? (
                  <div className="grid grid-cols-3 gap-2">
                    {postingId.resortAmenities
                      .filter(
                        (amenity) =>
                          amenity.type === "Các điểm tham quan gần đó"
                      )
                      .map((amenity) => (
                        <p key={amenity.id} className="text-medium">
                          {amenity.name}
                        </p>
                      ))}
                  </div>
                ) : (
                  <p className="text-medium text-gray-500">
                    Các điểm tham quan không có sẵn
                  </p>
                )}
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-4">Chính sách</h2>
                {postingId.resortAmenities &&
                postingId.resortAmenities.some(
                  (amenity) =>
                    amenity.type !== "Các điểm tham quan gần đó" &&
                    amenity.type !== "Các tính năng và tiện nghi tại chỗ"
                ) ? (
                  <div className="grid grid-cols-3 gap-2">
                    {postingId.resortAmenities
                      .filter(
                        (amenity) =>
                          amenity.type !== "Các điểm tham quan gần đó" &&
                          amenity.type !== "Các tính năng và tiện nghi tại chỗ"
                      )
                      .map((amenity) => (
                        <p key={amenity.id} className="text-medium">
                          {amenity.name}
                        </p>
                      ))}
                  </div>
                ) : (
                  <p className="text-medium text-gray-500">
                    Chính sách không có sẵn
                  </p>
                )}
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-3">Địa chỉ</h2>
                <p className="text-base mb-3">{postingId.address}</p>
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
              onClick={() => handleClose()}
            >
              Đóng
            </button>
          </div>
          <div className=" flex justify-end">
            <button
              className="border border-red-500 text-red-500 px-4 py-2 rounded-xl mr-2 hover:bg-red-500 hover:text-white transition duration-150"
              onClick={() => setIsRejectModalOpen(true)}
            >
              Từ chối
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition duration-150"
              onClick={handleAccept}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>

      <RejectRentalPostingModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onReject={handleReject}
      />
    </div>
  );
};

export default DetailRentalPostingModal;