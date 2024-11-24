import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import SpinnerWaiting from '../../components/LoadingComponent/spinnerWaiting';
import { getAllFeedbackResortListST, deactiveFeedback } from '../../service/systemStaffService/systemStaffAPI';
import ConfirmModal from '../../components/Modal/systemstaff/confirmMoal';

const FeedbackResortDetail = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isReport, setIsReport] = useState(false);
  const [flag, setFlag] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const { id } = useParams();

  const fetchAllFeedback = async () => {
    try {
      let data = await getAllFeedbackResortListST(isReport, page, size, id);
      if (data.status === 200) {
        setFeedbacks(data.data.content);
        setTotalPages(data.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
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

  const openDeleteModal = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
    setModalOpen(true);
  };

  const handleDeactiveFeedback = async () => {
    try {
      await deactiveFeedback(selectedFeedbackId);
      toast.success("Đánh giá đã bị xóa!!", { duration: 4000 });
      setFlag(!flag); // Refresh feedbacks
    } catch (error) {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
    } finally {
      setModalOpen(false); // Close modal after action
    }
  };

  useEffect(() => {
    fetchAllFeedback();
  }, [page, isReport, flag]);

  if (loading) {
    return <SpinnerWaiting />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="py-4 p-6 space-y-2">
          <h1 className="text-4xl font-bold text-gray-700">Quản lí đánh giá từ người dùng</h1>
          <h3 className="text-xl text-gray-500">
            Quản lí các phản và đánh giá của người dùng từ hệ thống tại đây theo resort!
          </h3>
        </div>

        <div className="flex items-center rounded-lg px-4 py-4 mb-5 space-x-2">
          <button
            onClick={() => setIsReport(true)}
            className={`px-10 hover:scale-105 shadow-xl py-2 ${
              isReport ? 'bg-gradient-to-r from-red-300 to-red-700 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Phản hồi bị báo cáo
          </button>
          <button
            onClick={() => setIsReport(false)}
            className={`px-8 hover:scale-105 shadow-xl py-2 ${
              !isReport ? 'bg-gradient-to-r from-green-300 to-green-700 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Phản hồi bình thường
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-300 border-b border-gray-200 text-gray-800">
              <th className="p-4 text-left">STT</th>
              <th className="p-4 text-left">Điểm đánh giá</th>
              <th className="p-4 text-left">Bình luận</th>
              <th className="p-4 text-left">Ghi chú</th>
              <th className="p-4 text-left">Tên resort</th>
              <th className="p-4 text-left">Tên người dùng</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {feedbacks &&
              feedbacks.map((feedback, index) => (
                <tr
                  key={feedback.id}
                  className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 flex items-center">{feedback.ratingPoint}</td>
                  <td className="p-4">{feedback.comment}</td>
                  <td className="p-4">{feedback.note || 'N/A'}</td>
                  <td className="p-4">{feedback.resort && feedback.resort.resortName}</td>
                  <td className="p-4">{feedback.customer && feedback.customer.fullName}</td>
                  <td className="p-4 text-center">
                    <FaTrash
                      onClick={() => openDeleteModal(feedback.id)}
                      className="text-red-500 cursor-pointer hover:scale-125 hover:text-red-600"
                      title="Xóa đánh giá"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {feedbacks && feedbacks.length > 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-5 w-full">
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-500"
            >
              <FaChevronLeft />
            </button>
            <div className="flex space-x-2 bg-gray-200 rounded-full px-2 py-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    index === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages - 1}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white"
            >
              <FaChevronRight />
            </button>
          </div>
        ) : (
          <span className="flex items-center justify-center space-x-2 mt-5 w-full">
            Không có bài đăng nào!!!
          </span>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeactiveFeedback}
        message="Bạn có chắc chắn muốn xóa đánh giá này?"
        isLoading={loading}
      />
    </>
  );
};

export default FeedbackResortDetail;
