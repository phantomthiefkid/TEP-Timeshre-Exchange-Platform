import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
    FaChevronLeft,
    FaChevronRight,
    FaDotCircle,
    FaPlus,
    FaSearch
} from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { getAllRentalPosting, getRentalPostingById } from "../../service/systemStaffService/systemStaffAPI";
import DetailRentalList from "../../components/Modal/systemstaff/detailRentalList";
import { Link } from "react-router-dom";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import { DocumentIcon } from "@heroicons/react/solid";
const ValuationList = () => {
    const [filterStatus, setFilterStatus] = useState("");
    const [rentalPostings, setRentalPostings] = useState([]);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [selectPosting, setSelectPosting] = useState();
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1)
    const [resortName, setResortName] = useState("");
    const fetchAllRentalPostings = async () => {
        try {
            let data = await getAllRentalPosting(page, size, resortName);
            if (data.status === 200) {
                setLoading(false)
                setRentalPostings(data.data.content)
                setTotalPages(data.data.totalPages);
                console.log(data.data)
            }
        } catch (error) {
            throw error
        }
    }

    const handleOpenDetailModal = async (postingId) => {

        let data = await getRentalPostingById(postingId);
        if (data.status === 200) {
            setSelectPosting(data.data)
            setOpenDetailModal(true);
        }
    }

    const handleSearch = (e) => {
        setResortName(e.target.value);
        setPage(0)
    }

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
        fetchAllRentalPostings();
    }, [page, resortName, flag])


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
        return (<SpinnerWaiting/>)
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
                <div className="py-4 p-6 space-y-2">
                    <h1 className="text-4xl font-bold text-gray-700">Danh sách định giá</h1>
                    <h3 className="text-xl text-gray-500">
                        Quản lí danh sách định giá ở đây.
                    </h3>
                </div>
                <div className="flex items-center justify-between p-2 mt-3 py-4">

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
                       

                        <Link to={`/systemstaff/createposting`}>
                            <button className="flex items-center bg-green-500 text-white rounded-lg px-4 py-2">
                                <FaPlus className="mr-3" />
                                Thêm mới
                            </button>
                        </Link>
                        <button onClick={() => setFlag(!flag)} className="bg-gradient-to-r text-white gap-2 from-blue-300 to-blue-400 border border-blue-300 text-gray-560 py-2 px-4 pr-10 rounded-xl shadow-md flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform hover:from-blue-400 hover:to-blue-300 hover:border-blue-500 focus:outline-none">
                            <FaArrowsRotate className="mr-3" />
                            Làm mới
                        </button>
                    </div>
                </div>
                {/* Filter Buttons */}
                <div className="flex items-center py-4 space-x-4 mb-5">
                    <button
                        onClick={() => setFilterStatus("")} // Reset filter
                        className={`px-4 py-2 rounded-md ${filterStatus === ""
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                            }`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setFilterStatus("Đang chờ")}
                        className={`px-4 py-2 rounded-md ${filterStatus === "Đang chờ"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                            }`}
                    >
                        Đang chờ
                    </button>
                    <button
                        onClick={() => setFilterStatus("Đã duyệt")}
                        className={`px-4 py-2 rounded-md ${filterStatus === "Đã duyệt"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                            }`}
                    >
                        Đã duyệt
                    </button>
                    <button
                        onClick={() => setFilterStatus("Từ chối")}
                        className={`px-4 py-2 rounded-md ${filterStatus === "Từ chối"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                            }`}
                    >
                        Từ chối
                    </button>
                </div>

                <table className="min-w-full bg-white border border-gray-200 ">
                    <thead>
                        <tr className="w-full bg-gray-200 border-b border-gray-200">
                            <th className="p-4 text-left ml-3">Tên resort</th>
                            <th className="p-4 text-left">Ngày nhận phòng</th>
                            <th className="p-4 text-left">Ngày trả phòng</th>
                            <th className="p-4 text-left">Định giá</th>
                            <th className="p-4 text-left">Tổng tiền</th>
                            <th className="p-4 text-left">Trạng thái</th>
                            <th className="p-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentalPostings && rentalPostings.map((posting, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-slate-100">
                                <td className="p-4 flex items-center w-72">
                                    <img
                                        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1"
                                        className="w-12 h-12 rounded-2xl mr-5"
                                    />
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold">{posting.resortName}</h3>

                                    </div>
                                </td>

                                <td className="p-4">{posting.checkinDate}</td>
                                <td className="p-4">{posting.checkoutDate}</td>
                                
                                <td className="p-4"><p >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(posting.priceValuation)}
                        </p></td>
                                <td className="p-4"><p >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(posting.priceValuation)}
                        </p></td>
                                <td className="p-4">
                                    <span
                                        className={`flex items-center hover:scale-105 transition-all duration-200 py-1 px-2 rounded-full w-36 ${getStatusStyles(posting.status).style}`}
                                    >
                                        <FaDotCircle className="mr-2" />
                                        {getStatusStyles(posting.status).label}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button onClick={() => handleOpenDetailModal(posting.rentalPostingId)}><DocumentIcon className="w-6 hover:scale-110" color="gray"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {openDetailModal && <DetailRentalList isOpen={openDetailModal} onClose={() => setOpenDetailModal(false)} postingId={selectPosting} flag={() => setFlag(!flag)}/>}
                {/* Pagination */}
                {
                    rentalPostings && rentalPostings.length > 0 ? (
                        <div className="flex items-center justify-center space-x-2 mt-5 w-full">
                            <button
                                onClick={handlePreviousPage}
                                disabled={page === 0}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-500"
                            >
                                <FaChevronLeft />
                            </button>
                            <div className="flex space-x-2 bg-gray-200 rounded-full px-2 py-1">
                                {
                                    Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setPage(index)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-full ${index === page ? "bg-blue-500 text-white" : "bg-white text-gray-500"}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))
                                }
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
                        <span className="flex items-center justify-center space-x-2 mt-5 w-full">Không có bài đăng nào!!!</span>
                    )
                }

            </div>
        </>
    );
};


export default ValuationList