import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaChevronLeft, FaChevronRight, FaList } from "react-icons/fa";
import { FaArrowsRotate, FaEllipsisVertical } from "react-icons/fa6";
import {
  getAllExchangeRequest,
  getExchangeRequestById,
} from "../../service/tsStaffService/tsStaffAPI";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import DetailExchangeRequestModal from "../../components/Modal/requestPostingModal/detailExchangeRequestModal";

const exchangeVerifyMNG = () => {
  const [allExchangeRequests, setAllExchangeRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [roomInfoCode, setRoomInfoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const fetchAllExchangeRequest = async () => {
    try {
      let data = await getAllExchangeRequest(page, size, roomInfoCode);
      if (data.status === 200) {
        setAllExchangeRequests(data.data.content);
        setTotalPages(data.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExchangeRequestDetails = async (requestId) => {
    try {
      const response = await getExchangeRequestById(requestId);
      setSelectedRequest(response.data);
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
    fetchAllExchangeRequest();
  }, [page, roomInfoCode]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="flex justify-between items-center py-4 px-6 mb-6 bg-gray-50 rounded-lg shadow-lg">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-700">
              Xác minh <span className="text-blue-600">Trao đổi</span>
            </h1>
            <h3 className="text-lg text-gray-500">
              Quản lý và xác minh <span className="font-semibold text-blue-600">timeshare</span> để thực hiện trao đổi tại đây.
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg px-6 py-3 font-medium shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
              onClick={() => fetchAllExchangeRequest()}
            >
              <FaArrowsRotate className="mr-3 text-lg" />
              Làm mới
            </button>
          </div>
        </div>


        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="p-4 text-left ml-3">Thông tin phòng</th>
              <th className="p-4 text-left">Loại phòng</th>
              <th className="p-4 text-left">Ngày nhận phòng</th>
              <th className="p-4 text-left">Ngày trả phòng</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>
          {loading ? (
            <SpinnerWaiting />
          ) : (
            <tbody>
              {allExchangeRequests.map((request, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 flex items-center w-72">
                    <img
                      src={request.exchangePosting.roomInfoUnitTypePhotos}
                      className="w-12 h-12 rounded-2xl mr-5"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-semibold">
                        {request.exchangePosting.roomInfoResortResortName}
                      </h3>
                      <p className="text-sm text-blue-400">{request.id}</p>
                    </div>
                  </td>

                  <td className="p-4">
                    {request.exchangePosting.roomInfoUnitTypeTitle}
                  </td>
                  <td className="p-4">{request.startDate}</td>
                  <td className="p-4">{request.endDate}</td>
                  <td className="p-4">
                    {request.status === "PendingApproval" && (
                      <span className="flex items-center justify-center px-2 py-1 rounded-full w-24 font-semibold bg-blue-100 text-blue-500">
                        Đang chờ
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div
                      className="cursor-pointer hover:bg-gray-100 rounded-xl w-8 h-8 p-2"
                      onClick={() => fetchExchangeRequestDetails(request.id)}
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
        {allExchangeRequests && allExchangeRequests.length > 0 ? (
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
              Không có yêu cầu xác minh nào có sẵn
            </span>
          </div>
        )}
        <DetailExchangeRequestModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          requestId={selectedRequest}
          onSave={fetchAllExchangeRequest}
        />
      </div>
    </>
  );
};

export default exchangeVerifyMNG;
