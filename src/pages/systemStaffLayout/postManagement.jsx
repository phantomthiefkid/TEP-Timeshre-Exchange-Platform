import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDotCircle,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { FaArrowsRotate, FaEllipsisVertical } from "react-icons/fa6";
import {
  getAllRentalPackagePosting,
  getRentalPostingById,
} from "../../service/systemStaffService/systemStaffAPI";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import DetaillRentalPackageModal from "../../components/Modal/systemstaff/detailRentalPackageModal";
import FormatCurrency from "../../components/Validate/formatCurrency";
const PostManagement = () => {
  const [filterStatus, setFilterStatus] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Tất cả");
  const [packageId, setPackageId] = useState(null);
  const [rentalPostings, setRentalPostings] = useState([]);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectPosting, setSelectPosting] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [resortName, setResortName] = useState("");
  const fetchAllRentalPostings = async () => {
    try {
      let data = await getAllRentalPackagePosting(page, size, resortName, packageId, filterStatus);
      if (data.status === 200) {
        setLoading(false);
        setRentalPostings(data.data.content);
        setTotalPages(data.data.totalPages);
      }
    } catch (error) {
      throw error;
    }
  };

  console.log(rentalPostings)
  const handlePackageSelect = (value, label) => {
    setSelectedOption(label); // Cập nhật tên hiển thị
    setPackageId(value); // Cập nhật ID gói
  };

  const handleOpenDetailModal = async (postingId) => {
    let data = await getRentalPostingById(postingId);
    if (data.status === 200) {
      setSelectPosting(data.data);
      console.log(data.data);
      setOpenDetailModal(true);
    }
  };

  const handleSearch = (e) => {
    setResortName(e.target.value);
    setPage(0);
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

  const packageOptions = [
    { value: null, label: "Tất cả" },
    { value: 1, label: "Gói cơ bản" },
    { value: 2, label: "Gói nâng cao" },
    { value: 3, label: "Gói Premium" },
    { value: 4, label: "Gói ủy quyền" },
  ];

  useEffect(() => {
    fetchAllRentalPostings();
  }, [page, resortName, filterStatus, packageId]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "PendingApproval":
        return { label: "Đang chờ", style: "bg-blue-100 text-blue-500", styleDot: "bg-blue-500" };
      case "Processing":
        return { label: "Đã duyệt", style: "bg-green-100 text-green-500", styleDot: "bg-green-500" };
      case "AwaitingConfirmation":
        return {
          label: "Chờ xác nhận giá",
          style: "bg-yellow-100 text-yellow-500",
          styleDot: "bg-yellow-500"
        };
      case "PendingPricing":
        return {
          label: "Chờ định giá",
          style: "bg-orange-100 text-orange-500",
          styleDot: "bg-orange-500"
        };
      case "Closed":
        return {
          label: "Từ chối", style: "bg-red-100 text-red-500",
          styleDot: "bg-red-500"
        };
      case "Expired":
        return {
          label: "Hết hạn", style: "bg-red-100 text-red-500",
          styleDot: "bg-red-500"
        };
      case "RejectPrice":
        return {
          label: "Từ chối giá", style: "bg-red-100 text-red-500",
          styleDot: "bg-red-500"
        };
      case "Completed":
        return {
          label: "Đã thuê", style: "bg-blue-100 text-blue-500",
          styleDot: "bg-blue-500"
        };
      default:
        return { label: "Không xác định", style: "bg-gray-100 text-gray-500", styleDot: "bg-gray-500" };
    }
  }

  if (loading) {
    return <SpinnerWaiting />;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="py-4 p-6 space-y-2">
          <h1 className="text-4xl font-bold text-gray-600">Danh sách bài đăng</h1>
          <h3 className="text-xl text-gray-500">
            Quản lí các bài đăng cho thuê ở đây.
          </h3>
        </div>
        <div className="flex items-center justify-start gap-6 p-2 mt-3 py-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xl">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="search"
              name="resortName"
              onChange={handleSearch}
              placeholder="Tìm kiếm bài đăng..."
              className="outline-none bg-transparent w-full text-gray-600 placeholder-gray-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center max-w-sm gap-2">
              <div className="flex-shrink-0">
                <label
                  for="filter"
                  className="text-xl font-semibold text-gray-800 whitespace-nowrap"
                >
                  Lọc theo:
                </label>
              </div>
              <div className="relative w-36">
                <input
                  type="checkbox"
                  id="dropdownToggle"
                  className="peer hidden w-full"
                />
                <label
                  htmlFor="dropdownToggle"
                  className="bg-gradient-to-r from-blue-300 to-purple-400 text-white border border-blue-300 py-2 px-4 pr-2 rounded-xl shadow-md flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform hover:border-blue-500 focus:outline-none"
                >
                  <span id="selectedOption">{selectedOption}</span>
                  <svg
                    className="fill-current h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </label>

                <div className="absolute hidden peer-checked:block w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {packageOptions.map(({ value, label }) => (
                    <label
                      key={value}
                      htmlFor="dropdownToggle"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer rounded-lg transition"
                      onClick={() => handlePackageSelect(value, label)}
                    >
                      {label}
                    </label>
                  ))}

                </div>
              </div>

            </div>

            {/* <Link to={`/systemstaff/createposting`}>
              <button className="bg-gradient-to-r from-green-300 to-green-400 border border-blue-300 text-gray-560 py-2 px-4 pr-10 rounded-xl shadow-md flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform hover:from-green-400 hover:to-green-300 hover:border-blue-500 focus:outline-none">
                <FaPlus className="mr-3" />
                Thêm mới
              </button>
            </Link> */}

          </div>
        </div>
        {/* Filter Buttons */}
        <div className="flex items-center py-4 space-x-4 mb-5">
          {[
            { label: "Tất cả", status: null, color: "bg-gradient-to-r from-gray-300 to-gray-500" },
            { label: "Đang chờ", status: "PendingApproval", color: "bg-gradient-to-r from-yellow-200 to-yellow-400" },
            { label: "Đã thuê", status: "Completed", color: "bg-gradient-to-r from-green-200 to-green-400" },
            { label: "Chờ xác nhận giá", status: "AwaitingConfirmation", color: "bg-gradient-to-r from-orange-200 to-orange-400" },
            { label: "Chờ định giá", status: "PendingPricing", color: "bg-gradient-to-r from-blue-200 to-blue-400" },
            { label: "Từ chối giá", status: "RejectPrice", color: "bg-gradient-to-r from-pink-200 to-pink-400" },
            { label: "Đã duyệt", status: "Processing", color: "bg-gradient-to-r from-purple-200 to-purple-400" },
            { label: "Từ chối", status: "Closed", color: "bg-gradient-to-r from-red-200 to-red-400" },
            { label: "Hết hạn", status: "Expired", color: "bg-gradient-to-r from-indigo-200 to-indigo-400" },
          ]
            .map(({ label, status, color }) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out
                ${filterStatus === status
                    ? `${color} text-white shadow-lg border-transparent`
                    : `bg-gray-100 text-gray-700 border border-gray-300 hover:${color} hover:text-white hover:shadow-lg`
                  }
            `}
              >
                {label}
              </button>
            ))}
        </div>

        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="p-4 text-left ml-3">Tên resort</th>
              <th className="p-4 text-left">Ngày nhận phòng</th>
              <th className="p-4 text-left">Ngày trả phòng</th>
              <th className="p-4 text-left">Giá tiền</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {rentalPostings &&
              rentalPostings.map((posting, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 flex items-center w-72">
                    <img
                      src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1"
                      className="w-12 h-12 rounded-2xl mr-5"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-light">{posting.resortName}</h3>
                    </div>
                  </td>

                  <td className="p-4">{posting.checkinDate}</td>
                  <td className="p-4">{posting.checkoutDate}</td>
                  <td className="p-4">{FormatCurrency(posting.totalPrice)}</td>
                  <td className="p-4">
                    <span
                      className={`flex items-center hover:scale-105 transition-all duration-200 py-1 px-2 rounded-full w-44 text-center ${getStatusStyles(posting.status).style}`}
                    >
                      <FaDotCircle className="mr-2" />
                      {getStatusStyles(posting.status).label}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleOpenDetailModal(posting.rentalPostingId)
                      }
                    >
                      <FaEllipsisVertical />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {openDetailModal && (
          <DetaillRentalPackageModal
            isOpen={openDetailModal}
            onClose={() => setOpenDetailModal(false)}
            postingId={selectPosting}
          />
        )}
        {/* Pagination */}
        {rentalPostings && rentalPostings.length > 0 ? (
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
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${index === page
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
          <span className="flex items-center justify-center space-x-2 mt-5 w-full">
            Không có bài đăng nào!!!
          </span>
        )}
      </div>
    </>
  );
};

export default PostManagement;
