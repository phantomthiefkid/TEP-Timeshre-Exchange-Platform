import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer/footer";
import Navigation from "../../components/Navbar/navigation";
import { Link, useParams } from "react-router-dom";
import {
  getAllResortByTsId,
  getTimeshareCompanyDetail,
} from "../../service/public/resortService/resortAPI";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import {
  HeartIcon,
  LocationMarkerIcon,
  SearchIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
const TimeshareCompanyDetail = () => {
  const { tsId } = useParams();
  const [companyDetail, setCompanyDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resorts, setResort] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [resortName, setResortName] = useState("");

  const mapSetup = () => {};

  const fetchCompanyDetail = async () => {
    try {
      const response = await getTimeshareCompanyDetail(tsId);
      if (response.status === 200) {
        setCompanyDetail(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch company detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllReosrtByTsId = async () => {
    try {
      const resortList = await getAllResortByTsId(page, size, resortName, tsId);
      if (resortList.status === 200) {
        setResort(resortList.data.content);
        setTotalPages(resortList.data.totalPages);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchCompanyDetail();
    fetchAllReosrtByTsId();
    mapSetup();
  }, [tsId, page, resortName]);

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

  if (loading) {
    return (
      <div>
        <SpinnerWaiting />
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div>
        <div className="py-6 md:py-12 px-4 md:px-12 lg:px-28 grid grid-cols-1 lg:grid-cols-4 gap-6 border-b-4">
          <img
            className="min-w-[410px] min-h-[260px] md:w-auto rounded-xl border shadow-lg col-span-1"
            src={companyDetail.logo}
            alt={companyDetail.timeshareCompanyName}
          />
          <div className="col-span-1 lg:col-span-3 py-6 relative p-4 md:p-6">
            <span className="font-semibold text-base md:text-lg text-gray-600">
              Công ty Timeshare
            </span>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">
              {companyDetail.timeshareCompanyName}
            </h3>
            <Link to={`/timesharecompanyprofile/${tsId}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl absolute bottom-4 lg:bottom-0">
                Thông tin chi tiết
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 px-4 md:px-12 lg:px-28 py-6 md:py-10 gap-6">
          <div className="col-span-6">
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Tìm kiếm resort..."
                className="w-full px-4 py-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleSearch(e)}
              />
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
                <SearchIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 overflow-auto">
              {resorts &&
                resorts.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 flex flex-col md:flex-row items-start gap-4 relative shadow-lg hover:shadow-xl"
                  >
                    <img
                      className="w-56 h-52 object-cover"
                      src={
                        item.logo ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={item.resortName || "Resort"}
                    />
                    <div className="relative h-full md:w-2/3">
                      <div
                        className="absolute top-4 right-0"
                        style={{ right: "-4.5rem" }}
                      >
                        <button>
                          <HeartIcon className="w-6 h-6 text-red-600" />
                        </button>
                      </div>
                      <div className="md:ml-4 flex flex-col justify-between py-4">
                        <Link to={`/resortdetail/${item.id}`}>
                          <h3 className="text-xl md:text-2xl font-bold mb-2">
                            {item.resortName || "Tên resort"}
                          </h3>
                        </Link>
                        <p className="text-gray-600 mb-4 flex gap-2">
                          <LocationMarkerIcon className="w-5 h-5" color="red" />
                          {item.resortLocationDisplayName ||
                            "Địa chỉ không xác định"}
                        </p>
                        <div className="flex items-center absolute bottom-4 left-4">
                          <StarIcon className="w-5 h-5 text-yellow-500" />
                          <span className="ml-1">
                            {item.averageRating || "0"}
                          </span>
                          <span className="text-gray-500 ml-2">
                            ({item.totalRating || "0"} đánh giá)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {resorts && resorts.length > 0 ? (
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
              <span className="flex items-center justify-center space-x-2 mt-5 w-full">
                Không tìm thấy resort!!!
              </span>
            )}
          </div>
          {/* Map View */}
          <div className="col-span-4 lg:col-span-4 relative h-screen">
            <MapContainer
              center={[
                companyDetail.location.latitude || 21.028511,
                companyDetail.location.longitude || 105.804817,
              ]}
              zoom={9}
              className="w-full h-screen"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {resorts &&
                resorts.map((resort, index) => (
                  <Marker
                    key={index}
                    position={[
                      resort.resortLocationLatitude || 10.762622,
                      resort.resortLocationLongitude || 106.660172,
                    ]}
                  >
                    <Popup>
                      <div className="flex flex-row justify-center w-full">
                        <img
                          className="h-[100px] w-1/3 mb-1 flex justify-center rounded-xl"
                          src={resort.logo}
                          alt={resort.resortName}
                        />

                        <div className="ml-3 mt-4 w-64 flex flex-col justify-center items-left">
                          <span className="text-sm font-semibold text-black">
                            {resort.resortName}
                          </span>
                          <div className="flex flex-row">
                            <p className="text-sm italic text-gray-500">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(resort.minPrice)}{" "}
                              -{" "}
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(resort.maxPrice)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TimeshareCompanyDetail;
