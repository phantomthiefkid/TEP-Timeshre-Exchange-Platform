import React from "react";

const DetailTimeshareCompanyModal = ({ isOpen, onClose, company }) => {
  if (!isOpen) return null; // Do not render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white p-4 rounded shadow-lg w-1/3 z-10">
        {" "}
        {/* Added z-10 to ensure it appears above the overlay */}
        <h2 className="text-xl font-semibold mb-4">Chi tiết đối tác</h2>
        {company ? (
          <div>
            <p>
              <strong>Tên đối tác:</strong> {company.timeshareCompanyName}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {company.address}
            </p>
            <p>
              <strong>Liên hệ:</strong> {company.contact}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {company.isActive ? "Đang hoạt động" : "Đã vô hiệu hóa"}
            </p>
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};
export default DetailTimeshareCompanyModal;
