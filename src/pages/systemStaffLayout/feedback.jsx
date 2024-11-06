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
        <div className="py-4 p-6 space-y-2">
          <h1 className="text-4xl font-bold text-gray-700">Quản lí đánh giá từ người dùng</h1>
          <h3 className="text-xl text-gray-500">
            Quản lí các phản và đánh giá của người dùng từ hệ thống tại đây theo resort!
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4">
          {resorts && resorts.length > 0 ? (
            resorts.map((resort) => (
              <Link to={`/systemstaff/feedbackdetail/${resort.id}`}>
                <div
                  key={resort.id}
                  className="relative bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl max-w-sm"
                >
                  {/* Image with gradient overlay */}
                  <div className="relative h-48">
                    <img
                      src={resort.logo}
                      alt={resort.resortName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-center text-xl font-bold text-gray-800 mb-2 space-x-2">
                      <FaHotel className="text-gold-500" />
                      <h2 className="truncate w-full text-center">{resort.resortName}</h2>
                    </div>

                    <div className="flex items-center justify-center text-gray-600 space-x-2 mb-4">
                      <FaMapMarkerAlt className="text-red-500" />
                      <p className="truncate w-full text-center">{resort.address}</p>
                    </div>

                    <button className="w-full mt-4 py-2 text-gray-900 font-semibold bg-gradient-to-r from-yellow-400 to-gold-500 rounded-full shadow-lg hover:from-yellow-500 hover:to-gold-600">
                      Xem đánh giá
                    </button>

                  </div>
                </div></Link>




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