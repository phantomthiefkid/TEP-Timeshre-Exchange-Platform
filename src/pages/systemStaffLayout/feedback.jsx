import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch
} from "react-icons/fa";

import { FaMapMarkerAlt, FaHotel } from "react-icons/fa";
import { getAllResortByName } from "../../service/public/resortService/resortAPI";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
const Feedback = () => {
  const [resorts, setResorts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [resortName, setResortName] = useState("");
  const [size, setSize] = useState(20);
  const [loading, setLoading] = useState(true)
  const fetchAllResort = async () => {
    try {
      let data = await getAllResortByName(page, size, resortName);
      if (data.status === 200) {
        setResorts(data.data.content);
        setTotalPages(data.data.totalPages)
        setLoading(false)
      }
    } catch (error) {
      throw error
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
    fetchAllResort()
  }, [page, resortName])
  if (loading) {
    return <SpinnerWaiting />
  }
  return (
    <>
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
       
        <div className="py-4 p-6 space-y-4 border-l-4 border-blue-500 bg-gray-50 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-700">
            Quản lí <span className="text-blue-600">đánh giá</span> từ người dùng
           
          </h1>
          <h3 className="text-lg text-gray-500">
          Quản lí các <span className="font-semibold text-blue-600">phản hồi</span> và <span className="font-semibold text-blue-600">đánh giá </span>của người từ từ hệ thống theo resort 
           
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

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 bg-slate-50 px-4 py-8">
          {resorts && resorts.length > 0 ? (
            resorts.map((resort) => (
              <Link
                to={`/systemstaff/feedbackdetail/${resort.id}`}
                key={resort.id}
                className="block"
              >
                <div className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform duration-300 hover:scale-105 overflow-hidden">
                  {/* Resort Image */}
                  <div className="relative h-56">
                    <img
                      src={resort.logo}
                      alt={resort.resortName}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                  </div>

                  {/* Resort Details */}
                  <div className="p-4">
                    {/* Resort Name */}
                    <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
                      {resort.resortName}
                    </h3>

                    {/* Address */}
                    <div className="flex items-center text-sm text-gray-600 space-x-2">
                      <FaMapMarkerAlt className="text-red-400" />
                      <p className="truncate">{resort.address}</p>
                    </div>

                    {/* Button */}
                    <button className="w-full mt-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md shadow-md hover:from-blue-500 hover:to-blue-700 transition duration-200">
                      Xem đánh giá
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 mt-5">
              Không có resort nào!!!
            </div>
          )}
        </div>

        {
          resorts && resorts.length > 0 ? (
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
            <div className="min-h-screen">
              <span className="flex items-center justify-center space-x-2 mt-5 w-full">Không có resort nào!!!</span>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Feedback