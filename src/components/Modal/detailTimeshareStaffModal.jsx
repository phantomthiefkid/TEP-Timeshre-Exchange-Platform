import React, { useEffect, useState } from "react";
import { FaAddressCard, FaXmark } from "react-icons/fa6";
import { getAllResort } from "../../service/tsCompanyService/tsCompanyAPI";
import { updateTimeshareCompanystaff } from "../../service/tsCompanyService/tsCompanyAPI";
import toast, { Toaster } from "react-hot-toast";
import SpinnerWaiting from "../LoadingComponent/spinnerWaiting";

const detailTimeshareStaffModal = ({ isOpen, onSave, onClose, tsStaff }) => {
  const [resortList, setResortList] = useState([]);
  const [selectedResort, setSelectedResort] = useState(tsStaff?.resortId || "");
  const [isActive, setIsActive] = useState(tsStaff?.isActive || false);
  const [error, setError] = useState("");

  const fetchResort = async () => {
    try {
      const data = await getAllResort();
      if (data.status === 200) {
        setResortList(data.data.content);
      }
    } catch (error) {
      console.error("Error fetching resort:", error);
      setError("Failed to load resorts. Please try again.");
    }
  };

  const handleAssignStaff = async () => {
    try {
      const dataAssign = {
        resortId: selectedResort || tsStaff.resortId,
        isActive: typeof isActive !== "undefined" ? isActive : tsStaff.isActive,
      };

      const response = await updateTimeshareCompanystaff(
        tsStaff.id,
        dataAssign
      );

      if (response.status === 200) {
        toast.success("Cập nhật nhân viên thành công.", { duration: 2000 });
        onSave();
        onClose();
      } else {
        toast.error("Đã xảy ra lỗi.", { duration: 2000 });
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error("Cập nhật thất bại.");
    }
  };

  const handleToggleActive = () => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      fetchResort();
    }

    if (tsStaff) {
      setSelectedResort(tsStaff.resortId || "");
      setIsActive(tsStaff.isActive || false);
    }
  }, [isOpen, tsStaff]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 focus:outline-none"
        >
          <FaXmark size={24} />
        </button>

        {tsStaff ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Thông tin nhân viên
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700">
                {tsStaff.userName}
              </h3>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Resort quản lý
              </label>
              <div className="flex items-center border rounded-lg p-3">
                <FaAddressCard className="mr-3 text-gray-600" />
                <select
                  value={selectedResort}
                  onChange={(e) => setSelectedResort(e.target.value)}
                  className="w-full border-none outline-none bg-white focus:ring-2 focus:ring-indigo-500 rounded-md"
                >
                  <option value="" disabled>
                    Vui lòng chọn Resort
                  </option>
                  {resortList.length > 0 &&
                    resortList.map((resort) => (
                      <option key={resort.id} value={resort.id}>
                        {resort.resortName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Trạng thái
              </label>
              <div className="flex items-center">
                <div
                  onClick={handleToggleActive}
                  className={`relative w-12 h-7 rounded-full cursor-pointer ${
                    isActive ? "bg-blue-500" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 h-5 w-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                      isActive ? "translate-x-5" : ""
                    }`}
                  ></div>
                </div>
                <span className="ml-4 text-sm text-gray-700">
                  {isActive ? "Đang hoạt động" : "Đã vô hiệu hóa"}
                </span>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                Hủy bỏ
              </button>
              <button
                className="bg-green-500 text-white rounded-lg px-6 py-2 hover:bg-green-600 transition-colors"
                onClick={handleAssignStaff}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        ) : (
          <SpinnerWaiting />
        )}
      </div>
    </div>
  );
};

export default detailTimeshareStaffModal;
