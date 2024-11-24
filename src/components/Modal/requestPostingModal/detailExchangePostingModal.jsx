import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaDotCircle, FaEdit, FaMap, FaPlusCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import RejectExchangePostingModal from "../../Modal/requestPostingModal/rejectExchangePostingModal";
import {
  approveExchangePostingById,
  rejectExchangePostingById,
  updateRoomAmenities,
} from "../../../service/tsStaffService/tsStaffAPI";
import SpinnerWaiting from "../../LoadingComponent/spinnerWaiting";
import { getUnitTypeByResortId } from "../../../service/public/resortService/resortAPI";

const detailExchangePostingModal = ({ isOpen, onClose, postingId, onSave }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  //  Unit Type Edit
  const [isDetailEdit, setIsDetailEdit] = useState(false);
  const [unitTypes, setUnitTypes] = useState([]);
  const [selectedUnitType, setSelectedUnitType] = useState("");
  // Room Amenities Edit
  const [isEditRoomAmenity, setIsEditRoomAmenity] = useState(false);
  const [updatedAmenities, setUpdatedAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState({});
  const amenityOptions = {
    KITCHEN: [
      "Máy pha cà phê",
      "Máy rửa chén",
      "Máy nướng bánh mì",
      "Tủ lạnh (lớn)",
      "Tủ lạnh (nhỏ)",
      "Bếp lò",
    ],
    ENTERTAINMENT: [
      "Máy phát DVD",
      "Quầy Bar",
      "Máy Chiếu Phim",
      "Mạng LAN Internet",
      "Radio",
      "TV thông minh",
      "Điện thoại bàn",
    ],
    FEATURES: [
      "Máy Điều Hòa",
      "Wifi",
      "Nước nóng/lạnh",
      "Nước uống miễn phí",
      "Sân hiên hoặc Ban Công",
      "Bàn ăn",
      "Bàn làm việc",
      "Máy giặt và máy sấy (trong căn hộ)",
    ],
    POLICY: [
      "Không hút thuốc",
      "Không thú cưng",
      "Không tổ chức tiệc",
      "Độ tuổi tối thiểu để nhận phòng: 18",
    ],
  };
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
      default:
        return { label: "Không xác định", style: "bg-gray-100 text-gray-500" };
    }
  };

  const handleOnClose = () => {
    setIsEditRoomAmenity(false);
    setIsDetailEdit(false);
    onClose();
  };
  const handleAccept = async (e) => {
    e.preventDefault();
    try {
      await approveExchangePostingById(postingId.exchangePostingId, {
        staffRefinementPrice: 0,
        note: "",
        priceValuation: 0,
        unitTypeId: selectedUnitType?.id || 0,
      });
      toast.success("Chấp nhận bài đăng", { duration: 2000 });
      onSave();
      handleOnClose();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra", { duration: 2000 });
    }
  };

  const handleReject = async (reason) => {
    try {
      await rejectExchangePostingById(reason, postingId.exchangePostingId);
      toast.success("Đã từ chối bài đăng", { duration: 2000 });
      handleOnClose();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra", { duration: 2000 });
      return error;
    }
  };

  const fetchUnitTypes = async (resortId) => {
    try {
      const response = await getUnitTypeByResortId(resortId);
      setUnitTypes(response.data);
    } catch (error) {
      console.log("Error fetching unit types:", error);
    }
  };

  const toggleEditAmenity = () => {
    setIsEditRoomAmenity((prev) => !prev);
  };

  const handleAddAmenity = (type) => {
    const newAmenity = selectedAmenity[type];
    if (!newAmenity) return;

    setUpdatedAmenities((prev) => [
      ...prev,
      { id: Math.random().toString(), name: newAmenity, type },
    ]);
    setSelectedAmenity((prev) => ({ ...prev, [type]: "" }));
  };

  const handleUpdateAmenity = async () => {
    try {
      const response = await updateRoomAmenities(
        postingId.roomInfoId,
        updatedAmenities
      );

      if (response.status === 200) {
        toast.success("Tiện ích đã được cập nhật!");
      } else {
        toast.error("Cập nhật tiện ích thất bại.");
      }
    } catch (error) {
      console.error("Update Room Amenity Error:", error);
    }
  };

  const renderAmenityDropdown = (type) => (
    <div className="grid grid-cols-3 gap-4 items-center">
      <select
        value={selectedAmenity[type] || ""}
        onChange={(e) =>
          setSelectedAmenity((prev) => ({ ...prev, [type]: e.target.value }))
        }
        className="col-span-2 border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Chọn tiện ích</option>
        {amenityOptions[type].map((amenity) => (
          <option key={amenity} value={amenity}>
            {amenity}
          </option>
        ))}
      </select>
      <button
        onClick={() => handleAddAmenity(type)}
        className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-150"
      >
        <FaPlusCircle size={16} />
      </button>
    </div>
  );

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (postingId.resortId) {
        fetchUnitTypes(postingId.resortId);
      }
      setUpdatedAmenities(postingId.roomAmenities || []);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
    return () => {
      setUnitTypes([]);
      setUpdatedAmenities([]);
    };
  }, [isOpen, postingId]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-end p-3 h-full">
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => handleOnClose()}
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
              onClick={() => handleOnClose()}
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
                  src={postingId.imageUrls}
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
                  <p className="font-medium">{postingId.exchangePostingId}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-medium text-gray-500">Đăng bởi</p>
                  <div className="flex flex-row items-center">
                    <img
                      src={postingId.imageUrls}
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
                <div className="flex flex-row justify-between mb-3">
                  <h2 className="text-2xl font-semibold mb-4">Loại Phòng</h2>
                  {isDetailEdit ? (
                    <button
                      className="border border-red-500 text-red-500 px-4 py-2 rounded-xl mr-2 hover:bg-red-500 hover:text-white transition duration-150"
                      onClick={() => setIsDetailEdit(!isDetailEdit)}
                    >
                      Hủy bỏ
                    </button>
                  ) : (
                    <div className="bg-white border-2 border-gray-300 rounded-xl p-2  hover:bg-gray-300 cursor-pointer">
                      <button
                        className="text-gray-500 focus:outline-none flex flex-row items-center"
                        onClick={() => setIsDetailEdit(!isDetailEdit)}
                      >
                        <FaEdit size={20} />
                        <span className="ml-1">Chỉnh sửa</span>
                      </button>
                    </div>
                  )}
                </div>
                {isDetailEdit ? (
                  <div>
                    <label
                      htmlFor="unitType"
                      className="block text-gray-700 font-medium"
                    >
                      Chọn loại phòng:
                    </label>
                    <select
                      id="unitType"
                      className="mt-2 block w-full p-3 border rounded-lg shadow-sm focus:outline-none"
                      value={selectedUnitType?.id || ""}
                      onChange={(e) => {
                        const selectedValue = parseInt(e.target.value, 10);
                        if (selectedValue !== selectedUnitType?.id) {
                          const selected = unitTypes.find(
                            (unitType) => unitType.id === selectedValue
                          );
                          setSelectedUnitType(selected);
                        }
                      }}
                    >
                      <option value="" disabled>
                        Chọn loại phòng
                      </option>
                      {unitTypes.map((unitType) => (
                        <option key={unitType.id} value={unitType.id}>
                          {unitType.title}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : postingId.unitType ? (
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

              {/* Amenity */}
              <div className="mb-4">
                <div className="flex flex-row justify-between">
                  <h2 className="text-2xl font-semibold mb-4">
                    Tiện ích và chính sách
                  </h2>
                  {postingId.roomAmenities &&
                  postingId.roomAmenities.length > 0 ? (
                    <button
                      className="text-gray-500 focus:outline-none flex flex-row items-center"
                      onClick={() => toggleEditAmenity()}
                    >
                      {!isEditRoomAmenity ? (
                        <div className="bg-white border-2 border-gray-300 rounded-xl p-2 hover:bg-gray-300 cursor-pointer flex flex-row">
                          <FaEdit size={20} />
                          <span className="ml-1">Chỉnh sửa</span>
                        </div>
                      ) : (
                        <div>
                          <button
                            className="border border-red-500 text-red-500 px-4 py-2 rounded-xl mr-2 hover:bg-red-500 hover:text-white transition duration-150"
                            onClick={() => setIsEditRoomAmenity(false)}
                          >
                            Hủy bỏ
                          </button>
                          <button
                            className="bg-green-500 border-2 text-white p-2 rounded-xl hover:bg-green-600 cursor-pointer"
                            onClick={() => handleUpdateAmenity()}
                          >
                            Hoàn tất
                          </button>
                        </div>
                      )}
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                {/* handle change room amenity */}
                {postingId.roomAmenities &&
                postingId.roomAmenities.length > 0 ? (
                  <div className="space-y-4">
                    {[
                      ...new Set(
                        updatedAmenities.map((amenity) => amenity.type)
                      ),
                    ].map((type) => {
                      const roomAmenitiesByType = updatedAmenities.filter(
                        (amenity) => amenity.type === type
                      );
                      const label =
                        {
                          KITCHEN: "Tiện ích bếp",
                          ENTERTAINMENT: "Tiện ích giải trí",
                          FEATURES: "Đặc trưng phòng",
                          POLICY: "Chính sách",
                        }[type] || "Khác";

                      return (
                        <div key={type}>
                          <h3 className="text-xl font-semibold mb-2">
                            {label}
                          </h3>
                          {!isEditRoomAmenity ? (
                            <div className="grid grid-cols-3 gap-2">
                              {roomAmenitiesByType.length > 0 ? (
                                roomAmenitiesByType.map((amenity) => (
                                  <div className="flex items-center">
                                    <FaDotCircle
                                      size={13}
                                      className="text-blue-300 mr-2"
                                    />
                                    <p key={amenity.id} className="text-medium">
                                      {amenity.name}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500">
                                  Không có tiện ích nào
                                </p>
                              )}
                            </div>
                          ) : (
                            <div className="grid grid-cols-3 gap-4">
                              {roomAmenitiesByType.map((amenity) => (
                                <div
                                  key={amenity.id}
                                  className="flex items-center justify-between border border-gray-300 p-2 rounded-lg"
                                >
                                  <p className="text-medium truncate">
                                    {amenity.name}
                                  </p>
                                  <button
                                    onClick={() =>
                                      setUpdatedAmenities((prev) =>
                                        prev.filter(
                                          (item) => item.id !== amenity.id
                                        )
                                      )
                                    }
                                    className="text-red-500 hover:text-red-600 focus:outline-none"
                                  >
                                    <FaXmark size={16} />
                                  </button>
                                </div>
                              ))}
                              {renderAmenityDropdown(type)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500">Tiện ích không có sẵn</p>
                )}
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-3">Địa chỉ</h2>
                <p className="text-base mb-3">{postingId.address}</p>
                <img
                  src={postingId.imageUrls}
                  className="w-[600px] h-[300px]"
                />
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
              onClick={() => handleOnClose()}
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
              onClick={() => handleAccept()}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>

      <RejectExchangePostingModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onReject={handleReject}
      />
    </div>
  );
};

export default detailExchangePostingModal;
