import React, { useState, useEffect } from "react";
import axios from "axios";
import platformLogo from "../../assets/logoTEPblack.png";
import { FaXmark } from "react-icons/fa6";
import {
  createTimeshareCompany,
  getAllTimeshareCompanyAccount,
} from "../../service/adminAPIService/adminAPI";
import toast from "react-hot-toast";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadFileImage } from "../../service/uploadFileService/uploadFileAPI";

const createTimeshareCompanyModal = ({ isOpen, onClose, onCreate }) => {
  const [timeshareCompanyName, setTimeshareCompanyName] = useState("");
  const [logo, setLogo] = useState("");
  const [location, setLocation] = useState({
    name: "",
    displayName: "",
    latitude: null,
    longitude: null,
    country: "",
    placeId: "",
  });
  const [ownerId, setOwnerId] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");

  const getAllTSC = async () => {
    try {
      const response = await getAllTimeshareCompanyAccount();
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error.response || error);
      setError("Failed to load accounts. Please try again.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFileImage(formData);
      if (response.status === 200) {
        const newLogoUrl = response.data[0]; // Assuming the response contains the uploaded image URL in the first element
        setLogo(newLogoUrl); // Update the state with the new logo URL
      }
    } catch (error) {
      console.error("Error uploading logo image:", error);
    }
  };

  const handleRemoveLogo = () => {
    setLogo("");
  };

  useEffect(() => {
    if (isOpen) {
      getAllTSC();
    }
  }, [isOpen]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTimeshareCompany = {
      id: 0,
      timeshareCompanyName,
      logo,
      location, // Use the selected address
      description,
      ownerId: parseInt(ownerId, 10),
      contact,
      isActive: true,
    };

    onCreate(newTimeshareCompany);
    setTimeshareCompanyName("");
    setLogo("");
    setLocation({
      name: "",
      displayName: "",
      latitude: null,
      longitude: null,
      country: "",
      placeId: "",
    });
    setDescription("");
    setOwnerId("");
    setContact("");

    // Close modal
    onClose();
  };

  const GeoSearch = ({ setLocation }) => {
    const map = useMap();

    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        showMarker: true,
        autoClose: true,
        keepResult: true,
        searchLabel: "Nhập địa chỉ",
      });

      map.addControl(searchControl);

      map.on("geosearch/showlocation", (event) => {
        const { x: longitude, y: latitude, raw } = event.location;

        setLocation({
          name: raw.name,
          displayName: raw.display_name,
          latitude,
          longitude,
          placeId: raw.place_id,
        });
      });

      return () => map.removeControl(searchControl);
    }, [map, setLocation]);

    return null;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-screen">
        <button
          onClick={onClose}
          className="absolute top-16 right-[24%] text-gray-500 hover:text-red-500 focus:outline-none"
        >
          <FaXmark size={24} />
        </button>
        <div className="flex justify-center mb-4 py-4">
          <img src={platformLogo} alt="Platform Logo" className="h-12 w-auto" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Tạo mới đối tác
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Tài khoản đối tác
              </label>
              <select
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn tài khoản</option>
                {accounts &&
                  accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.userName} ({account.email})
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Tên công ty timeshare
              </label>
              <input
                type="text"
                value={timeshareCompanyName}
                onChange={(e) => setTimeshareCompanyName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-medium mb-2">Địa chỉ</label>
              <p className="text-gray-500 text-sm">
                Nhập địa chỉ bằng thanh tìm kiếm trên bản đồ.
              </p>
              <div className="w-full h-80 rounded-lg shadow-md mt-4">
                <MapContainer
                  center={[
                    location.latitude || 21.028511,
                    location.longitude || 105.804817,
                  ]}
                  zoom={10}
                  className="h-full rounded-lg"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <GeoSearch setLocation={setLocation} />
                </MapContainer>
              </div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <label className="block mb-2 font-medium">Logo resort</label>

              {/* Upload button with icon */}
              {!logo && (
                <label
                  htmlFor="upload-room-images"
                  className="w-full h-32 border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-lg hover:border-blue-400 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-gray-500">
                    <FaCloudUploadAlt
                      size={40}
                      className="text-blue-500 transition-transform duration-300 hover:scale-110"
                    />
                    <span className="mt-2 text-base font-semibold">
                      Chọn ảnh
                    </span>
                  </div>
                </label>
              )}

              {/* Hidden file input */}
              <input
                id="upload-room-images"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Display uploaded or URL-provided logo */}
              <div className="flex justify-center items-center mt-4">
                {logo && (
                  <div className="relative flex justify-center items-center">
                    <div className="p-2 bg-gradient-to-tr from-gray-200 to-gray-400 rounded-full">
                      <div className="p-1 bg-gradient-to-tr from-blue-300 to-purple-400 rounded-full">
                        <img
                          src={logo}
                          alt="Resort Logo"
                          className="w-32 h-32 object-cover border-2 border-white rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                        />
                      </div>
                    </div>
                    {/* Icon X to remove logo */}
                    <button
                      onClick={handleRemoveLogo}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2 hover:bg-red-600 transition-transform duration-300"
                    >
                      <FaXmark size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Thông tin liên lạc
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Mô tả
              </label>
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ resize: "none" }}
              />
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 ml-4"
              >
                Thêm đối tác
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default createTimeshareCompanyModal;
