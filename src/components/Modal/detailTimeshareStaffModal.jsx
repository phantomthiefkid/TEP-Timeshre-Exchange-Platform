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
    <div className="fixed inset-0 flex items-center justify-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
        style={{ zIndex: 1000 }}
      >
        <h2 className="text-2xl font-semibold mb-8">Thông tin nhân viên</h2>
        <button
          onClick={onClose}
          className="absolute top-[22%] right-[34%] text-gray-500 hover:text-red-500 focus:outline-none"
        >
          <FaXmark size={24} />
        </button>

        {tsStaff ? (
          <div>
            <div className="flex items-center mb-5">
              <h2 className="text-xl font-semibold">{tsStaff.userName}</h2>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Resort quản lí</label>
              <div className="flex items-center border rounded-lg p-2">
                <FaAddressCard className="mr-2" />
                <select
                  value={selectedResort}
                  onChange={(e) => setSelectedResort(e.target.value)}
                  className="w-full outline-none bg-white"
                >
                  <option value="">Vui lòng chọn Resort</option>
                  {resortList.length > 0 &&
                    resortList.map((resort) => (
                      <option key={resort.id} value={resort.id}>
                        {resort.resortName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Trạng thái</label>
              <div className="flex items-center">
                <div
                  onClick={handleToggleActive}
                  className={`relative w-11 h-6 rounded-full cursor-pointer ${
                    isActive ? "bg-blue-500" : "bg-gray-300" // Set the inactive color to gray
                  }`}
                >
                  <div
                    className={`absolute top-0.5 start-[2px] h-5 w-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                      isActive ? "translate-x-full" : ""
                    }`}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {isActive ? "Đang hoạt động" : "Đã vô hiệu hóa"}
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <div>
                <button className="text-gray-500 mr-4" onClick={onClose}>
                  Hủy bỏ
                </button>
                <button
                  className="bg-green-400 text-white rounded-lg px-4 py-2"
                  onClick={handleAssignStaff}
                >
                  Lưu thay đổi
                </button>
              </div>
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
