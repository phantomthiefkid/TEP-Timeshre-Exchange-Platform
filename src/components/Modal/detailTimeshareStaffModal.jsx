import React, { useEffect, useState } from "react";
import { FaAddressCard, FaLocationDot, FaUser, FaXmark } from "react-icons/fa6";
import { getAllResort } from "../../service/tsCompanyService/tsCompanyAPI";

const detailTimeshareStaffModal = ({ isOpen, onClose, tsStaff }) => {
  const [isActive, setIsActive] = useState(false);
  // const [resortList, setResortList] = useState([]);
  // const [selectedResort, setSelectedResort] = useState(tsStaff?.resortId || "");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // const handleToggle = () => {
  //   setIsActive(!isActive);
  // };

  // const fetchResort = async () => {
  //   try {
  //     const response = await getAllResort();
  //     setResortList(response.data);
  //   } catch (error) {
  //     console.error("Error fetching resort:", error);
  //     setError("Failed to load resort. Please try again.");
  //   }
  // };

  // useEffect(() => {
  //   if (isOpen) {
  //     fetchResort();
  //   }
  // }, [isOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
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
                <select className="w-full outline-none bg-white">
                  <option>01</option>
                  <option>01</option>
                  <option>01</option>
                  <option>01</option>
                  <option>01</option>
                </select>
                {/* <select
                  value={selectedResort}
                  onChange={(e) => setSelectedResort(e.target.value)}
                  className="w-full outline-none bg-white"
                >
                  <option value="">Chọn Resort</option>
                  {resortList.map((resort) => (
                    <option key={resort.id} value={resort.id}>
                      {resort.resortName}
                    </option>
                  ))}
                </select> */}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Trạng thái</label>
              <div className="flex items-center">
                {/* <input
                  type="checkbox"
                  checked={isActive}
                  // onChange={handleToggle}
                  className="sr-only peer"
                /> */}
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-500">
                  <div
                    className={`absolute top-0.5 start-[2px] h-5 w-5 bg-white rounded-full transition-all ${
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
                <button className="bg-green-400 text-white rounded-lg px-4 py-2">
                  Lưu thay đổi{" "}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
      </div>
    </div>
  );
};

export default detailTimeshareStaffModal;
