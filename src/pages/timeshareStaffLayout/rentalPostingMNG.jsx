import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaChevronLeft, FaChevronRight, FaList } from "react-icons/fa";
import { FaArrowsRotate, FaEllipsisVertical } from "react-icons/fa6";
import DetailRentalPostingModal from "../../components/Modal/requestPostingModal/detailRentalPostingModal";
import {
  getAllRentalPosting,
  getRentalPostingById,
} from "../../service/tsStaffService/tsStaffAPI";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";

const RentalPostingMNG = () => {
  const [filterPackageId, setFilterPackageId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [allRentalPosts, setAllRentalPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [roomInfoCode, setRoomInfoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchAllRentalPosting = async () => {
    try {
      let data = await getAllRentalPosting(
        page,
        size,
        roomInfoCode,
        filterPackageId
      );
      if (data.status === 200) {
        setAllRentalPosts(data.data.content);
        console.log(data.data.content)
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

  useEffect(() => {
    fetchAllRentalPosting();
  }, [page, roomInfoCode, filterPackageId]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="flex justify-between items-center py-4 px-6 mb-6 bg-gray-50 rounded-lg shadow-lg">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-700">
              Bài đăng <span className="text-blue-600">Cho thuê</span>
            </h1>
            <h3 className="text-lg text-gray-500">
              Theo dõi và quản lý các bài đăng cho thuê tại đây.
            </h3>
          </div>
          <button
            className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg px-6 py-3 font-medium shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
            onClick={() => fetchAllRentalPosting()}
          >
            <FaArrowsRotate className="mr-3 text-lg" />
            Làm mới
          </button>
        </div>


        {/* Filter Buttons */}
        <div className="flex items-center space-x-1 mb-5">
          <button
            onClick={() => setFilterPackageId(null)} // Set to null to fetch all
            className={`px-4 py-2 rounded-md ${filterPackageId === null
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
          >
            Tất cả gói đăng
          </button>
          {[2, 3, 4].map((id) => (
            <button
              key={id}
              onClick={() => {
                setFilterPackageId(id);
                setPage(0);
              }}
              className={`px-4 py-2 rounded-md ${filterPackageId === id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
            >
              Gói đăng bài {id}
            </button>
          ))}
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
          {loading ? (
            <SpinnerWaiting />
          ) : (
            <tbody>
              {allRentalPosts.map((post, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 w-auto flex items-center space-x-4">
                    <img
                      src={post.resortImage}
                      className="w-12 h-12 rounded-2xl object-cover"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="font-semibold text-gray-800">
                        {post.resortName}
                      </h3>
                      <span className="text-gray-600">
                        Mã phòng: {post.roomCode}
                      </span>
                      <p className="text-sm text-blue-500">
                        {post.rentalPostingId}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">{post.checkinDate}</td>
                  <td className="p-4">{post.checkoutDate}</td>
                  <td className="p-4">
                    {post.rentalPackageId === 3 ? (
                      <div className="text-red-500 bg-red-100 font-semibold w-3/4 flex items-center justify-center px-2 py-1 rounded-full">
                        <span>Hỗ trợ định giá</span>
                      </div>
                    ) : post.rentalPackageId === 4 ? (
                      <div className="text-yellow-500 bg-yellow-100 font-semibold w-[150px] flex items-center justify-center px-2 py-1 rounded-full">
                        <span>Chờ định giá</span>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(post.totalPrice)}
                        </p>
                        <p className="font-medium">
                          (
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(post.pricePerNights)}
                          / đêm)
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {post.status === "PendingApproval" && (
                      <span className="flex items-center justify-center px-2 py-1 rounded-full w-24 font-semibold bg-blue-100 text-blue-500">
                        Đang chờ
                      </span>
                    )}
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
          )}
        </table>

        {/* Pagination */}
        {allRentalPosts && allRentalPosts.length > 0 ? (
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
                      className={`w-10 h-10 flex items-center justify-center rounded-xl ${index === page
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
        ) : (
          <div className="flex flex-col items-center justify-center mt-5 w-full min-h-[370px] border-2 border-dashed border-gray-300 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100">
            <FaList className="text-gray-400 text-6xl animate-pulse mb-4" />
            <span className="text-gray-600 text-lg font-medium">
              Không có bài đăng cho thuê nào có sẵn
            </span>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <DetailRentalPostingModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        postingId={selectedPost}
        onSave={fetchAllRentalPosting}
      />
    </>
  );
};

export default RentalPostingMNG;
