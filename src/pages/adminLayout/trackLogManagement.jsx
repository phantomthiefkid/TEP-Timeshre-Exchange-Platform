import React from "react";
import { FaClock, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";

// Mảng logs mẫu
const logs = [
  {
    id: 1,
    userId: "U12345",
    timestamp: "2024-11-22 10:30:00",
    action: "Đăng nhập hệ thống",
    page: "/dang-nhap",
    details: "Người dùng đăng nhập thành công",
    status: "Thành công",
  },
  {
    id: 2,
    userId: "U67890",
    timestamp: "2024-11-22 10:35:00",
    action: "Chuyển sang Trang chủ",
    page: "/trang-chu",
    details: "Người dùng chuyển đến Trang chủ",
    status: "Thông báo",
  },
  {
    id: 3,
    userId: "U11111",
    timestamp: "2024-11-22 10:40:00",
    action: "Thất bại khi thực hiện thanh toán",
    page: "/thanh-toan",
    details: "Cổng thanh toán không thể tải",
    status: "Lỗi",
  },
  {
    id: 4,
    userId: "U22222",
    timestamp: "2024-11-22 10:50:00",
    action: "Xem chi tiết sản phẩm",
    page: "/san-pham/123",
    details: "Người dùng xem thông tin sản phẩm ABC",
    status: "Thành công",
  },
  {
    id: 5,
    userId: "U33333",
    timestamp: "2024-11-22 11:00:00",
    action: "Thay đổi mật khẩu tài khoản",
    page: "/tai-khoan",
    details: "Người dùng đổi mật khẩu thành công",
    status: "Thành công",
  },
  {
    id: 6,
    userId: "U44444",
    timestamp: "2024-11-22 11:10:00",
    action: "Xóa thông tin không hợp lệ",
    page: "/quan-ly",
    details: "Người dùng xóa dữ liệu không chính xác",
    status: "Cảnh báo",
  },

];

const statusIcons = {
  "Thành công": <FaCheckCircle className="text-green-500 text-2xl" />,
  "Thông báo": <FaInfoCircle className="text-blue-500 text-2xl" />,
  "Lỗi": <FaTimesCircle className="text-red-500 text-2xl" />,
  "Cảnh báo": <FaExclamationTriangle className="text-yellow-500 text-2xl" />,
};

const TrackLogManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Tiêu đề */}
      <div className="bg-white p-6 shadow-md rounded-md mb-6">
        <h1 className="text-4xl font-medium text-gray-600 mb-2">
          Lịch sử <span className="text-blue-600">hành động</span> trên <span className="text-blue-600">hệ thống</span>
        </h1>
        <p className="text-lg text-gray-500">
          Xem các <span className="text-blue-600">hành động</span> đã thực hiện trên nền tảng bởi <span className="text-blue-600">người dùng</span>. Mỗi sự kiện sẽ được ghi lại chi tiết để dễ dàng <span className="text-blue-600">theo dõi</span> và <span className="text-blue-600">xử lý</span>.
        </p>
      </div>


      {/* Timeline */}
      <div className="relative border-l-4 border-gray-300 pl-12 py-6 mx-6 bg-white rounded-lg shadow-lg">
        {logs.map((log) => (
          <div
            key={log.id}
            className="mb-6 p-4 transition-all border duration-300 hover:bg-gray-50 hover:shadow-lg rounded-lg shadow-md"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-6 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 shadow-xl transition-transform duration-300 hover:scale-125">
              {statusIcons[log.status]}
            </div>

            {/* Nội dung */}
            <div className="ml-12">
              <div className="flex items-center justify-between text-sm">
                <h2 className="font-semibold text-gray-700 text-lg">
                  {log.action} <span className="text-xs text-gray-500">({log.page})</span>
                </h2>
                <div className="flex items-center gap-1 text-gray-500">
                  <FaClock />
                  <span>{log.timestamp}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Người dùng: <span className="font-medium text-gray-800">{log.userId}</span>
              </p>
              <p className="text-gray-500 text-xs mt-1">{log.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackLogManagement;
