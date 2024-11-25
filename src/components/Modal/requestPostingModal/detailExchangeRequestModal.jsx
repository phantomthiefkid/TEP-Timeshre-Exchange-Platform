import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaMap, FaPlusCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import RejectExchangeRequestModal from "../../Modal/requestPostingModal/rejectExchangeVerifyModal";
import {
  approveExchangeRequestById,
  rejectExchangeRequestById,
} from "../../../service/tsStaffService/tsStaffAPI";
import SpinnerWaiting from "../../LoadingComponent/spinnerWaiting";
import { getUnitTypeByResortId } from "../../../service/public/resortService/resortAPI";

const detailExchangeRequestModal = ({ isOpen, onClose, requestId, onSave }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  //  Unit Type Edit
  const [isDetailEdit, setIsDetailEdit] = useState(false);
  const [unitTypes, setUnitTypes] = useState([]);
  const [selectedUnitType, setSelectedUnitType] = useState("");

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
    setIsDetailEdit(false);
    onClose();
  };
  const handleAccept = async () => {
    try {
      await approveExchangeRequestById(requestId.id, {
        note: "",
        unitTypeId: selectedUnitType?.id || 0,
      });
      onSave();
      toast.success("Chấp nhận yêu cầu", { duration: 2000 });
      handleOnClose();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra", { duration: 2000 });
    }
  };

  const handleReject = async (reason) => {
    try {
      await rejectExchangeRequestById(reason, requestId.id);
      toast.success("Đã từ chối yêu cầu", { duration: 2000 });
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

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (requestId.roomInfo.resortId) {
        fetchUnitTypes(requestId.roomInfo.resortId);
      }
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
    return () => setUnitTypes([]);
  }, [isOpen, requestId]);

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

        {requestId ? (
          <>
            <div className="border-b">
              <div className="flex items-center p-4 m-3 border border-gray-300 rounded-xl">
                <img
                  src={requestId.exchangePosting.roomInfoResortLogo}
                  alt="Hotel Thumbnail"
                  className="w-20 h-20 rounded-lg mr-4"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold">
                      {requestId.exchangePosting.roomInfoResortResortName}
                    </h2>
                  </div>
                  <div className="flex justify-end w-1/3">
                    <span
                      className={`text-medium px-2 py-1 w-3/4 text-center rounded-full ${
                        getStatusStyles(requestId.status).style
                      }`}
                    >
                      {getStatusStyles(requestId.status).label}
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
                  <p className="font-medium">{requestId.id}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-medium text-gray-500">Đăng bởi</p>
                  <div className="flex flex-row items-center">
                    <img
                      src={requestId.ownerAvatar}
                      className="w-12 h-12 rounded-full mr-4 border border-blue-400"
                    />
                    <p className="font-medium">{requestId.ownerFullName}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-medium text-gray-500">Ngày nhận phòng</p>
                  <p className="font-medium">{requestId.startDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-medium text-gray-500">Ngày trả phòng</p>
                  <p className="font-medium">{requestId.endDate}</p>
                </div>
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
                ) : requestId.exchangePosting ? (
                  <div className="flex border p-4 rounded-lg shadow-sm">
                    <div className="w-1/4">
                      <img
                        src={requestId.exchangePosting.roomInfoUnitTypePhotos}
                        className="w-full h-full rounded-lg border border-gray-200"
                      />
                    </div>
                    <div className="w-2/3 pl-5">
                      <div className="flex justify-between">
                        <div className="w-1/2">
                          <h2 className="text-lg font-bold">Thông tin phòng</h2>
                          <h1 className="text-2xl font-bold mb-2">
                            {requestId.exchangePosting.roomInfoUnitTypeTitle}
                          </h1>
                          <p>Số đêm: {requestId.exchangePosting.nights} đêm</p>
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
              onClick={handleAccept}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>

      <RejectExchangeRequestModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onReject={handleReject}
      />
    </div>
  );
};

export default detailExchangeRequestModal;
