import { XCircleIcon, XIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  FaBook,
  FaCouch,
  FaGamepad,
  FaPlus,
  FaPlusCircle,
  FaUpload,
  FaUtensils,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { updateResortUnitType } from "../../service/tsCompanyService/tsCompanyAPI";
import { uploadFileImage } from "../../service/uploadFileService/uploadFileAPI";
import Loading from "../LoadingComponent/loading";
import LoadingWaitingComponent from "../LoadingComponent/loadingWaitingComponent";

const UpdateResortUnitTypeModal = ({ onClose, selectedUnitType, flag }) => {
  const [picture, setPicture] = useState([]);
  const [unitType, setUnitType] = useState(selectedUnitType);
  const [amenity, setAmenity] = useState({ name: "", type: "" });
  const [loading, setLoading] = useState(false);
  const handleAmenityChange = (e) => {
    const { name, value } = e.target;
    setAmenity({ ...amenity, [name]: value });
    console.log(name, value);
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUnitType({ ...unitType, [name]: value });
  };

  const handleAddAmenity = () => {
    if (amenity.name && amenity.type) {
      setUnitType({
        ...unitType,
        unitTypeAmenitiesList: [...unitType.unitTypeAmenitiesList, amenity],
      });
      setAmenity({ name: "", type: "" });
    }
  };

  const handleRemoveAmenity = (name) => {
    setUnitType((prevState) => ({
      ...prevState,
      unitTypeAmenitiesList: prevState.unitTypeAmenitiesList.filter(
        (amenity) => amenity.name !== name
      ),
    }));
  };

  const handleUploadFileImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadFileImage(formData);
    if (response.status === 200) {
      setUnitType({ ...unitType, photos: response.data[0] });
      console.log("Link: ", response.data[0]);
    }
  };

  const handleRemoveImage = async (e) => {
    setUnitType({ ...unitType, photos: "" });
  };

  const handleUpdate = () => {
    const { id, unitTypeAmenitiesList, ...otherFields } = unitType;

    const unitTypeAmenitiesDTOS = unitTypeAmenitiesList.map(
      ({ isActive, ...rest }) => rest
    );

    const updatedResort = {
      ...otherFields,
      unitTypeAmenitiesDTOS,
    };

    setLoading(true);

    updateResortUnitType(updatedResort, selectedUnitType.id)
      .then(() => {
        // onClose()
        flag();
        toast.success("Cập nhật thành công!", { duration: 2000 });
      })
      .catch(() => {
        toast.error("Cập nhật thất bại!", { duration: 2000 });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderAmenitiesByType = (type) => {
    const amenities =
      unitType &&
      unitType.unitTypeAmenitiesList.filter((amenity) => amenity.type === type);

    return (
      <div>
        {amenities.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {amenities.map((amenity, index) => (
              <div
                key={`${type}-${index}`}
                className="relative bg-gray-100 shadow-md p-1 flex justify-between items-center rounded-full border-2 transition-colors duration-200 ease-in-out hover:border-sky-500"
              >
                <span className="text-gray-500 px-2 font-normal">
                  {amenity.name}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAmenity(amenity.name)}
                  className="text-red-400 flex items-center p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
                >
                  <XCircleIcon className="h-7 w-7" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Chưa có tiện ích nào</p>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <Toaster
        toastOptions={{
          style: {
            fontSize: "18px",
            padding: "16px",
            maxWidth: "600px",
          },
          success: {
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
        position="top-center"
        reverseOrder={false}
      />
      <div className="bg-white rounded-xl shadow-lg w-full max-w-7xl">
        <div className="relative bg-blue-900 text-gray-100 py-4 px-6 rounded-t-xl shadow-lg">
          {/* Background Image/Overlay */}
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center rounded-t-xl"
            style={{
              backgroundImage:
                "url(https://unwinds.s3.ap-southeast-2.amazonaws.com/1732163006058_unitType.jpg)",
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-extrabold tracking-wider uppercase font-serif mb-2">
              Cập nhật loại phòng
            </h3>
            <div className="mt-1">
              <p className="text-lg font-medium italic text-blue-100">
                Cập nhật thông tin chi tiết để hoàn thiện danh mục
              </p>
            </div>
          </div>

          {/* Decorative Bottom Arc */}
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-blue-900 to-transparent rounded-b-xl"></div>
        </div>

        <div className="max-h-[800px] overflow-auto p-2">
          {/* Two-column layout */}
          <div className="p-8 bg-white border-2 rounded-lg space-y-8">
            {/* Section: Room Details */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-6 space-y-6">
                <h4 className="text-2xl font-semibold text-gray-700 border-b pb-2">
                  Thông tin cơ bản
                </h4>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700 mb-1">
                    Tên loại phòng *
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="border-b bg-slate-100 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
                    value={unitType.title}
                    onChange={handleOnchange}
                    placeholder="Nhập tên loại phòng"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-gray-700 mb-1">
                      Số phòng ngủ
                    </label>
                    <select
                      name="bedrooms"
                      className="w-full rounded-lg bg-gray-50 py-2 px-4 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={unitType.bedrooms}
                      onChange={handleOnchange}
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 mb-1">
                      Số người ở
                    </label>
                    <select
                      name="sleeps"
                      className="w-full bg-gray-50 rounded-lg py-2 px-4 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={unitType.sleeps}
                      onChange={handleOnchange}
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label className="font-medium text-gray-700 mb-1">
                      Mã phòng (nếu có):
                    </label>
                    <input
                      type="text"
                      name="buildingsOption"
                      className="border-b bg-slate-100 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
                      value={unitType.buildingsOption}
                      onChange={handleOnchange}
                      placeholder="Nhập mã phòng"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-6 space-y-4">
                <h4 className="text-2xl font-semibold text-gray-700 border-b pb-2">
                  Chi tiết loại phòng
                </h4>
                <div className="flex flex-col col-span-2">
                  <label className="font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    rows={5}
                    name="description"
                    className="border-b bg-slate-100 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
                    value={unitType.description}
                    onChange={handleOnchange}
                    placeholder="Mô tả chi tiết..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col col-span-2">
                    <label className="font-medium text-gray-700 mb-1">
                      Hướng phòng
                    </label>
                    <input
                      type="text"
                      name="view"
                      className="border-b bg-slate-100 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
                      value={unitType.view}
                      onChange={handleOnchange}
                      placeholder="Nhập hướng phòng"
                    />
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label className="font-medium text-gray-700 mb-1">
                      Diện tích:
                    </label>
                    <input
                      type="text"
                      name="area"
                      className="border-b bg-slate-100 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
                      value={unitType.area}
                      onChange={handleOnchange}
                      placeholder="Nhập diện tích"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Room Image */}
            <div className="space-y-6 px-6">
              <h4 className="text-2xl text-center font-semibold text-gray-600 border-b pb-2">
                Ảnh phòng
              </h4>
              <div className="flex flex-col items-center">
                {!unitType.photos ? (
                  <label
                    htmlFor="upload-room-images"
                    className="w-full h-44 flex flex-col justify-center items-center border-dashed border-4 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition"
                  >
                    <FaUpload size={40} className="text-gray-400 mb-2" />
                    <span className="text-gray-500 font-medium">
                      Tải lên ảnh loại phòng
                    </span>
                    <input
                      id="upload-room-images"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleUploadFileImage}
                    />
                  </label>
                ) : (
                  <div className="relative w-3/4 h-64">
                    <img
                      src={unitType.photos}
                      alt="Room Photo"
                      className="object-cover w-full h-full rounded-lg shadow-md"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                    >
                      <FaXmark size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Single column section below */}
          <div className="border-2 py-4 mt-4 rounded-lg">
            <label className="font-semibold text-gray-700 text-xl tracking-wide p-6">
              Các loại giường
            </label>
            <div className="grid grid-cols-3 gap-6 mt-4 px-4 p-6 m-5">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">
                  Số giường King:
                </label>
                <select
                  name="bedsKing"
                  className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"
                  value={unitType.bedsKing}
                  onChange={handleOnchange}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">
                  Số giường lớn:
                </label>
                <select
                  name="bedsFull"
                  className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"
                  value={unitType.bedsFull}
                  onChange={handleOnchange}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">
                  Số giường sofa:
                </label>
                <select
                  name="bedsSofa"
                  className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"
                  value={unitType.bedsSofa}
                  onChange={handleOnchange}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">
                  Số giường gấp:
                </label>
                <select
                  name="bedsMurphy"
                  value={unitType.bedsMurphy}
                  onChange={handleOnchange}
                  className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">
                  Số giường Queen:
                </label>
                <select
                  name="bedsQueen"
                  value={unitType.bedsQueen}
                  onChange={handleOnchange}
                  className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">
                  Số giường đôi:
                </label>
                <select
                  name="bedsTwin"
                  className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"
                  value={unitType.bedsTwin}
                  onChange={handleOnchange}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 p-6 border-2 py-4 rounded-lg">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2 text-lg tracking-wide">
                Số phòng tắm:
              </label>
              <select
                name="bathrooms"
                className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"
                value={unitType.bathrooms}
                onChange={handleOnchange}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <label className="font-semibold text-gray-700 mb-2 text-lg tracking-wide">
                Nhà bếp:
              </label>
              <div className="flex gap-2">
                {["Không có", "Bếp chung", "Bếp riêng", "Bếp ngoài trời"].map(
                  (option) => (
                    <label
                      key={option}
                      className={`flex items-center text-gray-900 p-2 cursor-pointer border-2 rounded-full
            ${
              unitType.kitchen === option
                ? "border-blue-500 bg-gradient-to-r from-blue-200 to-purple-200 text-gray-600"
                : "border-gray-300 bg-white"
            } 
            hover:border-blue-400 hover:bg-blue-50`}
                    >
                      <input
                        type="radio"
                        name="kitchen"
                        value={option}
                        onChange={handleOnchange}
                        className="hidden" // Hide the default radio button
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold text-gray-700 mb-2 text-lg tracking-wide">
                Giá:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">VND</span>
                <input
                  type="number"
                  name="price"
                  className="pl-14 bg-gray-100 pr-4 py-2 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                  value={unitType.price}
                  onChange={handleOnchange}
                  placeholder="Nhập giá"
                />
              </div>
            </div>
          </div>

          {/* Amenities section */}
          <div className="py-6 px-8 bg-white border-2 mt-4 rounded-lg">
            <h4 className="font-bold text-xl text-gray-800 mb-6">
              Tiện ích (Amenities)
            </h4>

            {/* Form thêm tiện ích */}
            <div className="flex flex-wrap gap-4 mb-8 items-center">
              <input
                type="text"
                name="name"
                className="flex-grow border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleAmenityChange}
                value={amenity.name}
                placeholder="Nhập tên tiện ích"
              />
              <select
                name="type"
                value={amenity.type}
                onChange={handleAmenityChange}
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Chọn loại tiện ích
                </option>
                <option value="KITCHEN">Bếp</option>
                <option value="ENTERTAINMENT">Giải trí</option>
                <option value="FEATURES">Tiện nghi</option>
                <option value="POLICY">Chính sách</option>
              </select>
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2"
                onClick={handleAddAmenity}
              >
                <FaPlus size={18} />
                Thêm
              </button>
            </div>

            {/* Danh sách tiện ích */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kitchen */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-lg text-blue-600 flex items-center gap-2">
                  <FaUtensils /> Bếp
                </h5>
                <div className="mt-4">{renderAmenitiesByType("KITCHEN")}</div>
              </div>

              {/* Entertainment */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h5 className="font-semibold text-lg text-purple-600 flex items-center gap-2">
                  <FaGamepad /> Giải trí
                </h5>
                <div className="mt-4">
                  {renderAmenitiesByType("ENTERTAINMENT")}
                </div>
              </div>

              {/* Features */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-lg text-green-600 flex items-center gap-2">
                  <FaCouch /> Tiện nghi
                </h5>
                <div className="mt-4">{renderAmenitiesByType("FEATURES")}</div>
              </div>

              {/* Policy */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h5 className="font-semibold text-lg text-yellow-600 flex items-center gap-2">
                  <FaBook /> Chính sách
                </h5>
                <div className="mt-4">{renderAmenitiesByType("POLICY")}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 py-4 mb-2 px-8">
            <button
              className="flex items-center justify-center bg-gradient-to-r from-red-200 to-red-400 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
              onClick={onClose}
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
              onClick={handleUpdate}
              disabled={loading} // Optionally disable the button while loading
            >
              {loading ? (
                <>
                  {/* Spinner */}
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Đợi trong giây lát...
                </>
              ) : (
                "Cập nhật"
              )}
            </button>
          </div>
        </div>
      </div>
      {/* {loading && (<LoadingWaitingComponent />)} */}
    </div>
  );
};

export default UpdateResortUnitTypeModal;
