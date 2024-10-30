import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaArrowsRotate, FaEllipsisVertical } from "react-icons/fa6";
import DetailRentalPostingModal from "../../components/Modal/requestPostingModal/detailRentalPostingModal";
import {
  getAllRentalPosting,
  getRentalPostingById,
} from "../../service/tsStaffService/tsStaffAPI";

const rentalPostingMNG = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [allRentalPosts, setAllRentalPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [roomInfoCode, setRoomInfoCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchAllRentalPosting = async () => {
    try {
      let data = await getAllRentalPosting(page, size, roomInfoCode);
      if (data.status === 200) {
        setAllRentalPosts(data.data.content);
        setTotalPages(data.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRentalPostingDetails = async (rentalPostingId) => {
    try {
      const response = await getRentalPostingById(rentalPostingId);
      setSelectedPost(response.data);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.log(error);
    }
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

  const filteredTransactions = filterStatus
    ? allRentalPosts.filter(
        (transaction) => transaction.status === filterStatus
      )
    : allRentalPosts;

  useEffect(() => {
    fetchAllRentalPosting();
  }, [page, roomInfoCode]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="flex items-center justify-between p-2 mt-3">
          <div className="mb-6">
            <h1 className="text-4xl font-bold">Bài đăng cho thuê</h1>
            <h3 className="text-xl text-gray-500">
              Quản lí các bài đăng cho thuê ở đây.
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center bg-blue-500 text-white rounded-md px-4 py-2">
              <FaArrowsRotate className="mr-3" />
              Làm mới
            </button>
          </div>
        </div>
        {/* Filter Buttons */}
        <div className="flex items-center space-x-1 mb-5">
          <button
            onClick={() => setFilterStatus("")}
            className={`px-4 py-2 rounded-md ${
              filterStatus === ""
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterStatus("PendingApproval")}
            className={`px-4 py-2 rounded-md ${
              filterStatus === "PendingApproval"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            Đang chờ
          </button>
          <button
            onClick={() => setFilterStatus("Completed")}
            className={`px-4 py-2 rounded-md ${
              filterStatus === "Completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            Đã duyệt
          </button>
          <button
            onClick={() => setFilterStatus("Closed")}
            className={`px-4 py-2 rounded-md ${
              filterStatus === "Closed"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            Từ chối
          </button>
          <button
            onClick={() => setFilterStatus("Expired")}
            className={`px-4 py-2 rounded-md ${
              filterStatus === "Expired"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            Hết hạn
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="p-4 text-left ml-3">Thông tin phòng</th>
              <th className="p-4 text-left">Ngày nhận phòng</th>
              <th className="p-4 text-left">Ngày trả phòng</th>
              <th className="p-4 text-left">Giá tiền</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((post, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4 w-auto flex items-center space-x-4">
                  <img
                    src={post.image}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="font-semibold text-gray-800">
                      {post.resortName}
                    </h3>
                    <span className="text-gray-600">
                      {post.roomCode} - {post.roomName}
                    </span>
                    <p className="text-sm text-blue-500">
                      {post.rentalPostingId}
                    </p>
                  </div>
                </td>

                <td className="p-4">{post.checkinDate}</td>
                <td className="p-4">{post.checkoutDate}</td>
                <td className="p-4">{post.pricePerNights}</td>
                <td className="p-4">
                  <span
                    className={`flex items-center justify-center px-2 py-1 rounded-full w-24 font-semibold ${
                      post.status === "PendingApproval"
                        ? "bg-blue-100 text-blue-500"
                        : post.status === "Completed"
                        ? "bg-green-100 text-green-500"
                        : post.status === "Closed"
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {post.status === "PendingApproval"
                      ? "Đang chờ"
                      : post.status === "Completed"
                      ? "Đã duyệt"
                      : post.status === "Closed"
                      ? "Từ chối"
                      : "Hết hạn"}
                  </span>
                </td>
                <td className="p-4">
                  <div
                    className="cursor-pointer hover:bg-gray-100 rounded-xl w-8 h-8 p-2"
                    onClick={() =>
                      fetchRentalPostingDetails(post.rentalPostingId)
                    }
                  >
                    <FaEllipsisVertical />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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

        <DetailRentalPostingModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          postingId={selectedPost}
        />
      </div>
    </>
  );
};

export default rentalPostingMNG;
