import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import Navigation from "../../components/Navbar/navigation";
import { LocationMarkerIcon, StarIcon, XIcon } from "@heroicons/react/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getResortById } from "../../service/public/resortService/resortAPI";
import DetailUnitTypeModal from "../../components/Modal/detailUnitTypePublic";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FaLocationPin } from "react-icons/fa6";
const ResortDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUnitTypeModal, setIsOpenUnitTypeModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const [resort, setResort] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUnitTypeId, setSelectedUnitTypeId] = useState(null);
  const [visibleFeedbackCount, setVisibleFeedbackCount] = useState(2);
  const handleShowMore = () => {
    setVisibleFeedbackCount((prevCount) => prevCount + 4);
  };
  const handleHidden = () => {
    setVisibleFeedbackCount(2);
  };

  const images = [
    "https://media.architecturaldigest.com/photos/57e42de0fe422b3e29b7e78f/16:9/w_2560%2Cc_limit/JW_LosCabos_2015_MainExterior.jpg",
    "https://vntimetravel.com/media/wysiwyg/Intercontinantal-Phu-Quoc-r.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/460855827.jpg?k=8e640d1427c880873eb257ae5f314b8847fa2d54b83ad6f68a824c6bd2d5967c&o=&hp=1",
    "https://mettavoyage.com/wp-content/webp-express/webp-images/uploads/2023/05/1166_palm_garden_resort_hoi_an-1.jpeg.webp",
    "https://eholiday.vn/wp-content/uploads/2023/11/Bay-Resort-Hoi-An-Quang-Nam-1.jpg",
    "https://cafefcdn.com/203337114487263232/2023/4/29/440495612-1682757753771111360326-1682762017539-16827620176502127401821.jpg",
  ];

  const fetchResortById = async () => {
    try {
      let data = await getResortById(id);
      if (data && data.status === 200) {
        setResort(data.data);
        console.log(data.data);
        setLoading(false);
        setSelectedImage(data.data.logo);
      }
    } catch (error) {
      throw error;
    }
  };

  console.log(resort);

  useEffect(() => {
    if (id) {
      fetchResortById();
    }
  }, [id]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleOpenUnitTypeModal = (unitTypeId) => {
    setIsOpenUnitTypeModal(true);
    setSelectedUnitTypeId(unitTypeId);
  };

  if (loading) {
    return <SpinnerWaiting />;
  }

  return (
    <>
      <Navigation />
      <div className="lg:px-14 md:px-14 py-10 w-3/4 mx-auto">
        {/* Back to Search Link */}

        {/* Resort Title and Favorite Button */}
        <div className="flex justify-between py-4">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-600">
            {resort ? resort.resortName : ""}
          </h1>
        </div>

        {/* Location and Rating */}
        <div className="flex justify-between py-4">
          <p className="font-medium flex items-center gap-2">
            <LocationMarkerIcon className="w-8 h-8 text-red-500" />
            {resort ? resort.address : ""}
          </p>
          <span className="flex gap-2 items-center">
            <StarIcon className="w-6 h-6" color="yellow" />
            4.6 (16 đánh giá)
          </span>
        </div>

        {/* Image Grid with 6:4 ratio */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Large image on the left (75% width) */}
          <div
            className={`w-full ${
              resort.imageUrls?.length === 0 ||
              (!resort.imageUrls[0] &&
                !resort.imageUrls[1] &&
                !resort.imageUrls[2])
                ? "lg:w-full"
                : "lg:w-[75%]"
            }`}
          >
            <img
              className="h-[550px] w-full object-cover rounded-lg"
              src={resort.logo}
              alt="Resort Main"
            />
          </div>

          {/* Stacked images on the right (25% width) */}
          {resort.imageUrls?.length > 0 && (
            <div className="w-full lg:w-[25%] flex flex-col justify-end gap-2 mt-4 lg:mt-0">
              {resort.imageUrls[0] && (
                <img
                  className="h-[180px] w-full object-cover rounded-lg"
                  src={resort.imageUrls[0]}
                  alt="Resort Image 1"
                />
              )}
              {resort.imageUrls[1] && (
                <img
                  className="h-[180px] w-full object-cover rounded-lg"
                  src={resort.imageUrls[1]}
                  alt="Resort Image 2"
                />
              )}
              {resort.imageUrls[2] && (
                <div className="relative h-[180px] w-full">
                  <img
                    className="h-full w-full object-cover rounded-lg opacity-60"
                    src={resort.imageUrls[2]}
                    alt="Resort Image 3"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer"
                    onClick={openModal}
                  >
                    <span className="text-white font-semibold text-lg">
                      Xem thêm
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Popup with Swiper */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className=" p-2 rounded-lg max-w-5xl w-full relative">
              <button
                className="absolute top-2 right-2 text-white p-1 rounded-full"
                onClick={closeModal}
              >
                <XIcon className="w-8" />
              </button>

              {/* Large Image Display */}
              <div className="mb-4">
                <img
                  src={selectedImage} // Display the selected image
                  className="h-[500px] w-full object-cover rounded-lg"
                  alt={`Slide ${selectedImage}`}
                />
              </div>

              {/* Thumbnails Below */}
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
                // navigation={true}
                // pagination={{ clickable: true }}
                // modules={[Navigation]}
              >
                {resort &&
                  resort.imageUrls &&
                  resort.imageUrls.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        className={`h-[100px] w-full object-cover rounded-lg cursor-pointer ${
                          selectedImage === index
                            ? "border-4 border-blue-500"
                            : ""
                        }`} // Highlight the selected image
                        alt={`Thumbnail ${index}`}
                        onClick={() => setSelectedImage(image)} // Set image on click
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        )}

        <div className="py-10 mt-6 px-12 space-y-8 bg-gray-50 rounded-lg border shadow-lg">
          <h3 className="text-4xl font-semibold text-indigo-600 mb-4 border-b-4 border-indigo-500 pb-2 inline-block">
            Giới thiệu
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed px-4 mt-6">
            {resort ? resort.description : "Chưa có thông tin giới thiệu."}
          </p>
        </div>

        <div className="py-10 px-12 space-y-8 bg-stone-100 rounded-lg shadow-md mt-8">
          <h3 className="text-3xl font-semibold text-indigo-600 mb-8">
            Loại phòng
          </h3>

          {resort &&
            resort.unitTypeDtoList &&
            resort.unitTypeDtoList.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-6 border rounded-lg bg-white hover:bg-gray-100 px-8 py-6 shadow-md hover:shadow-lg transition-transform transform"
              >
                {/* Thông Tin Phòng */}
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <img
                    src={item.photos}
                    className="w-full md:w-48 h-44 object-cover shadow-lg"
                    alt={`Ảnh của ${item.title}`}
                  />
                  <div className="space-y-3">
                    <span className="text-lg font-medium text-gray-600">
                      Thông tin phòng
                    </span>
                    <h3 className="text-2xl font-bold text-indigo-600">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => handleOpenUnitTypeModal(item.id)}
                      className="text-indigo-500 underline font-medium hover:text-indigo-700 transition-colors"
                    >
                      Xem chi tiết phòng
                    </button>
                  </div>
                </div>

                {/* Đặc Điểm Phòng */}
                <div className="space-y-4">
                  <div className="text-lg font-semibold text-gray-700">
                    Đặc điểm phòng
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <div>
                      <span>
                        Phòng ngủ: <strong>{item.bedrooms}</strong>
                      </span>
                    </div>
                    <div>
                      <span>
                        Số người: <strong>{item.sleeps}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-600">
                    Phòng tắm: <strong>{item.bathrooms}</strong>
                  </div>
                  <div className="text-gray-600">
                    Nhà bếp: <strong>{item.kitchen}</strong>
                  </div>
                </div>
              </div>
            ))}

          {isOpenUnitTypeModal && (
            <DetailUnitTypeModal
              selectedId={selectedUnitTypeId}
              onClose={() => setIsOpenUnitTypeModal(false)}
            />
          )}
        </div>

        <div className="space-y-12 w-full mx-auto mt-6">
          {/* Các tính năng và tiện nghi tại chỗ */}
          <div className="py-10 px-8 bg-gray-50 rounded-lg shadow-md border">
            <h3 className="text-3xl font-semibold text-indigo-600 mb-6 border-b-2 pb-2 border-indigo-400 inline-block">
              Các tính năng và tiện nghi tại chỗ
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {resort &&
                resort.resortAmenityList
                  .filter((amenity) => amenity.type === "AMENITIES")
                  .map((amenity, index) => (
                    <li
                      key={index}
                      className="flex items-center p-4 bg-white rounded-md shadow-sm hover:bg-indigo-50 transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-indigo-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L15.09 8H21l-4.91 4L16 18l-4-3.09L8 18l.91-6L4 8h5.91L12 2z" />
                      </svg>
                      <span className="text-gray-700 font-medium">
                        {amenity.name}
                      </span>
                    </li>
                  ))}
            </ul>
          </div>

          {/* Các tiện nghi gần kề */}
          <div className="py-10 px-8 bg-gray-50 rounded-lg shadow-md border">
            <h3 className="text-3xl font-semibold text-indigo-600 mb-6 border-b-2 pb-2 border-indigo-400 inline-block">
              Các điểm tham quan gần đó
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {resort &&
                resort.resortAmenityList
                  .filter((amenity) => amenity.type === "NEARBY_ATTRACTIONS")
                  .map((amenity, index) => (
                    <li
                      key={index}
                      className="flex items-center p-4 bg-white rounded-md shadow-sm hover:bg-indigo-50 transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-indigo-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L15.09 8H21l-4.91 4L16 18l-4-3.09L8 18l.91-6L4 8h5.91L12 2z" />
                      </svg>
                      <span className="text-gray-700 font-medium">
                        {amenity.name}
                      </span>
                    </li>
                  ))}
            </ul>
          </div>

          {/* Chính sách */}
          <div className="py-10 px-8 bg-gray-50 rounded-lg shadow-md border">
            <h3 className="text-3xl font-semibold text-indigo-600 mb-6 border-b-2 pb-2 border-indigo-400 inline-block">
              Chính sách
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {resort &&
                resort.resortAmenityList
                  .filter((amenity) => amenity.type === "POLICY")
                  .map((amenity, index) => (
                    <li
                      key={index}
                      className="flex items-center p-4 bg-white rounded-md shadow-sm hover:bg-indigo-50 transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-indigo-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L15.09 8H21l-4.91 4L16 18l-4-3.09L8 18l.91-6L4 8h5.91L12 2z" />
                      </svg>
                      <span className="text-gray-700 font-medium">
                        {amenity.name}
                      </span>
                    </li>
                  ))}
            </ul>
          </div>
        </div>

        <div className="py-16 text-indigo-600">
          <h3 className="text-3xl font-bold mb-6">Đánh giá</h3>
          <span className="text-2xl flex items-center gap-2 font-semibold">
            <StarIcon className="w-12" color="yellow" />
            <span className="text-3xl">
              {(resort && resort.averageRating && "/5") || "N/A"}
            </span>
            <span className="text-gray-400 text-xl mt-1 font-light">
              {resort && resort.totalRating} đánh giá
            </span>
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
            {resort &&
              resort.feedbackList &&
              resort.feedbackList
                .slice(0, visibleFeedbackCount)
                .map((item, index) => (
                  <div
                    key={index}
                    className="border-b-4 w-full p-6 flex justify-between bg-gray-50 rounded-lg shadow-md"
                  >
                    <div className="flex flex-col justify-start gap-6 w-2/3">
                      <div className="flex items-center gap-4">
                        <div>
                          <img
                            src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/315873108_1547775398968586_291388187145697786_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=2V78iXS9vMQQ7kNvgF9WUhL&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=ApeT9Xgi8oLUPfNsLgTDe7Z&oh=00_AYBElDZMRDh4ekuLpuaWk42oOL-oY8MbC-l_MyIJkiANqQ&oe=67350D93"
                            alt="Avatar"
                            className="w-20 h-20 border-4 border-green-400 rounded-full"
                          />
                        </div>
                        <div>
                          <div className="mb-2 text-md text-gray-600">
                            <p>Ngày: {item.createdDate}</p>
                          </div>
                          <div>
                            <p className="text-md text-gray-600">
                              Người đánh giá: {item.user && item.user.fullName}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-4 p-4">
                        <p className="text-lg font-semibold">
                          Nội dung đánh giá:{" "}
                          <span className="text-md font-normal">
                            {item.comment}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="w-1/3 text-left">
                      <span className="font-medium text-lg text-gray-800">
                        Đánh giá
                      </span>
                      <div className="flex justify-start items-center gap-2">
                        {Array.from(
                          { length: item.ratingPoint },
                          (_, index) => (
                            <StarIcon
                              key={index}
                              className="w-8 text-yellow-500"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}

            {resort &&
              resort.feedbackList &&
              visibleFeedbackCount < resort.feedbackList.length && (
                <div className="text-center mt-6 col-span-2">
                  <button
                    onClick={handleShowMore}
                    className="flex items-center mx-auto justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:from-indigo-500 hover:to-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  >
                    <span>Xem thêm</span>
                    <FaChevronDown className="text-lg" />
                  </button>
                </div>
              )}

            {resort && resort.feedbackList && visibleFeedbackCount > 3 && (
              <div className="text-center mt-6 col-span-2">
                <button
                  onClick={handleHidden}
                  className="flex items-center mx-auto justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:from-indigo-500 hover:to-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  <span>Ẩn bớt đánh giá</span>
                  <FaChevronUp className="text-lg" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="py-10 w-full">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Địa chỉ</h3>
          <div className="flex flex-row">
            <FaLocationPin className="text-red-500 mr-2" size={18} />
            <p className="text-base font-semibold mb-4">
              {resort.location.displayName}
            </p>
          </div>
          <div className="col-span-4 lg:col-span-4 relative h-[570px]">
            <MapContainer
              center={[
                resort.location.latitude || 21.028511,
                resort.location.longitude || 105.804817,
              ]}
              zoom={24}
              className="w-full h-[570px]"
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                position={[
                  resort.location.latitude || 10.7763897,
                  resort.location.longitude || 106.7011391,
                ]}
              >
                <Popup className="flex flex-col items-center justify-center w-[300px] rounded-xl shadow-lg text-center border-2 border-blue-300 ">
                  {resort.resortName} <br />
                  {resort.address}
                </Popup>

                <Popup className="flex flex-col items-center justify-center w-[300px] rounded-xl shadow-lg text-center border-2 border-blue-300 ">
                  <div>
                    <img
                      className="w-full h-full mb-2"
                      src={companyDetail.logo}
                      alt={companyDetail.timeshareCompanyName}
                    />
                    <div className="text-sm font-semibold text-gray-800">
                      {companyDetail.timeshareCompanyName}
                    </div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResortDetail;
