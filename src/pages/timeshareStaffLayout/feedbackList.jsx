import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaList,
  FaStar,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getAllFeedbacksResortForRating,
  getFeedbackResort,
  sendReportFeedbackResort,
} from "../../service/tsStaffService/tsStaffAPI";
import CountUp from "react-countup";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import ReportFeedbackModal from "../../components/Modal/tsStaffModal/reportFeedbackModal";
import { toast, Toaster } from "react-hot-toast";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FeedbackList = () => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRating, setTotalRating] = useState(null);
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
  const [totalRatingCount, setTotalRatingCount] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const [flag, setFlag] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isOpenReport, setIsOpenReport] = useState(false);
  const fetchAllFeedbackResort = async () => {
    try {
      let data = await getFeedbackResort(page, size);
      if (data.status === 200) {
        setFeedbacks(data.data.content);
        setTotalPages(data.data.totalPages);
      }
    } catch (error) {
      throw error;
    }
  };

  const countRatings = (feedbacks) => {
    const counts = [0, 0, 0, 0, 0]; // 5 sao, 4 sao, 3 sao, 2 sao, 1 sao
    feedbacks &&
      feedbacks.forEach((feedback) => {
        const rating = feedback.ratingPoint;
        if (rating >= 1 && rating <= 5) {
          counts[5 - rating] += 1; // Đếm ngược từ 5 sao
        }
      });
    setRatingCounts(counts);
  };

  const fetchAllRating = async () => {
    try {
      let data = await getAllFeedbacksResortForRating();
      if (data.status === 200) {
        setTotalRating(data.data.content.length);
        setTotalRatingCount(data.data.content);
        setLoading(false);
      }
    } catch (error) {
      throw error;
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
    fetchAllFeedbackResort();
  }, [page, flag]);

  useEffect(() => {
    fetchAllRating();
  }, []);

  useEffect(() => {
    countRatings(totalRatingCount);
  }, [totalRatingCount]);

  const calculateAverageRating = () => {
    const totalStars = ratingCounts.reduce(
      (acc, count, index) => acc + count * (5 - index),
      0
    );
    const totalRatings = ratingCounts.reduce((acc, count) => acc + count, 0);
    return totalRatings > 0 ? (totalStars / totalRatings).toFixed(1) : 0;
  };

  const handleToggleDropdown = (feedbackId) => {
    setIsDropdownOpen((prev) => (prev === feedbackId ? null : feedbackId));
    setSelectedFeedback(feedbackId);
  };
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(null);
    }
  };

  const handleOpenReportModal = () => {
    setIsOpenReport(true);
  };

  const handleSubmitReport = async (feedbackId, note) => {
    try {
      await sendReportFeedbackResort(feedbackId, note);
      toast.success("Báo cáo đánh giá đã được gửi", { duration: 3000 });
      setFlag(!flag);
    } catch (error) {
      toast.error("Gặp lỗi khi gửi báo cáo!!", { duration: 3000 });
      throw error;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const data = {
    labels: ["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"],
    datasets: [
      {
        label: "Số lượt đánh giá",
        data: ratingCounts,
        backgroundColor: "rgb(242, 198, 33)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  if (loading) {
    return <SpinnerWaiting />;
  }

  return (
    <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between items-center mb-6 w-full">
        <div className="py-4 px-6 space-y-4 border-l-4 border-blue-500 bg-gray-50 rounded-lg shadow-lg w-full">
          <h1 className="text-4xl font-bold text-gray-700">
            Quản lý Đánh giá từ{" "}
            <span className="text-blue-600">Người dùng</span>
          </h1>
          <h3 className="text-lg text-gray-500">
            Theo dõi và quản lý các{" "}
            <span className="font-semibold text-blue-600">phản hồi</span> và{" "}
            <span className="font-semibold text-blue-600">đánh giá</span> của
            người dùng theo từng resort.
          </h3>
        </div>
      </div>

      {/* Bố cục biểu đồ và rating trung bình */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 p-6" style={{ height: "300px" }}>
          <Bar
            data={data}
            options={{ ...options, maintainAspectRatio: false }}
          />
        </div>

        {/* Hiển thị rating trung bình */}
        <div className="flex items-center justify-center bg-gray-100 rounded-xl p-6 text-center col-span-1">
          <div>
            <h2 className="text-7xl font-bold text-gray-700">
              {calculateAverageRating()}
            </h2>
            <div className="flex justify-center mt-2 text-yellow-400">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <FaStar key={index} size={20} />
                ))}
            </div>
            <p className="text-xl font-bold text-gray-500 mt-4">
              <CountUp start={0} end={totalRating} duration={3} /> bài đánh giá
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-center text-3xl font-semibold text-gray-700">
        Các đánh giá từ người dùng
      </h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {feedbacks.length > 0 &&
          feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl border-4 mb-4 transition-transform duration-200 transform hover:scale-105 hover:bg-gray-50"
            >
              <FaEllipsisV
                onClick={() => handleToggleDropdown(feedback.id)}
                className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-700"
              />
              {isDropdownOpen === feedback.id && (
                <div
                  ref={dropdownRef}
                  className="absolute top-10 right-4 bg-white border-2 rounded-lg shadow-lg w-32 p-2"
                >
                  <button
                    onClick={handleOpenReportModal}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100"
                  >
                    Báo cáo
                  </button>
                  {/* <button className="w-full text-left px-2 py-1 hover:bg-gray-100">
                    Chi tiết
                  </button>
                  <button className="w-full text-left px-2 py-1 hover:bg-gray-100">
                    Khác
                  </button> */}
                </div>
              )}

              <div className="flex items-center space-x-4">
                <img
                  src={
                    feedback.customer.avatar
                      ? feedback.customer.avatar
                      : "https://unwinds.s3.ap-southeast-2.amazonaws.com/1733451623389_profile.png"
                  }
                  alt={feedback.customer.fullName}
                  className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover shadow-sm"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {feedback.customer.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {feedback.createdDate}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-700">
                  <span className="font-bold">Resort:</span>{" "}
                  {feedback.resort.resortName}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Đánh giá:</span>
                  <span className="flex items-center ml-1">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`h-5 w-5 ${
                          index < feedback.ratingPoint
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 15l-5.878 3.09 1.124-6.552L.246 6.835l6.757-.978L10 .5l2.997 5.357 6.757.978-4.996 4.703 1.124 6.552L10 15z" />
                      </svg>
                    ))}
                  </span>
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Nhận xét:</span>{" "}
                  {feedback.comment || "Không có nhận xét"}
                </p>
                <p className="text-gray-500 italic mt-2">
                  Ghi chú: {feedback.note || "N/A"}
                </p>
              </div>
            </div>
          ))}
      </div>

      {isOpenReport && (
        <ReportFeedbackModal
          selected={selectedFeedback}
          onClose={() => setIsOpenReport(false)}
          onSubmit={handleSubmitReport}
        />
      )}

      {/* Pagination */}
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
                  index === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-500"
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
        <div className="flex flex-col items-center justify-center mt-5 w-full min-h-[370px] border-2 border-dashed border-gray-300 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100">
          <FaList className="text-gray-400 text-6xl animate-pulse mb-4" />
          <span className="text-gray-600 text-lg font-medium">
            Không có đánh giá nào!!!
          </span>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
