import React, { useEffect, useState } from "react";
import { getProfileTsCompany, updateProfileTsCompany } from "../../service/tsCompanyService/tsCompanyAPI";
import { FaEdit, FaRemoveFormat, FaSave, FaTimes, FaUpload, FaSpinner } from "react-icons/fa"; // Import an icon for editing
import { uploadFileImage, uploadMultipleFileImage } from "../../service/uploadFileService/uploadFileAPI";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { toast, Toaster } from "react-hot-toast";
import { InformationCircleIcon, LocationMarkerIcon, PhoneIcon, XIcon } from "@heroicons/react/solid";

const ProfileTsCompany = () => {
    const [profile, setProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [updatedCompanyName, setUpdatedCompanyName] = useState("");
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("");
    const [logo, setLogo] = useState("")
    const [originalLogo, setOriginalLogo] = useState("")
    const [imageUrls, setImageUrls] = useState([])
    const [imageUrlsOrigin, setImageUrlsOrigin] = useState([])
    const [openSwipper, setOpenSwipper] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const fetchProfileTsCompany = async () => {
        try {
            let data = await getProfileTsCompany();
            if (data.status === 200) {
                const {
                    timeshareCompanyName,
                    logo,
                    address,
                    description,
                    contact,
                    imageUrls,
                } = data.data;

                setUpdatedCompanyName(timeshareCompanyName)
                setDescription(description)
                setAddress(address)
                setContact(contact)
                setImageUrls(imageUrls)
                setImageUrlsOrigin(imageUrls)
                setLogo(logo)
                setOriginalLogo(logo);

                setProfile({
                    timeshareCompanyName,
                    logo,
                    address,
                    description,
                    contact,
                    imageUrls,
                });
            }
        } catch (error) {
            throw error;
        }
    };

    const closeModal = () => setOpenSwipper(false);
    const handleOpenModalSwiper = (url) => {
        setOpenSwipper(true);
        setSelectedImage(url)
    }
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setProfile((prev) => ({
            ...prev,
            timeshareCompanyName: updatedCompanyName,
        }));
        setIsEditing(false);
    };

    useEffect(() => {
        fetchProfileTsCompany();
    }, []);

    const handleUpdateProfileCompany = async () => {
        setIsLoading(true);
        const dataUpdate = {
            timeshareCompanyName: updatedCompanyName,
            description: description,
            address: address,
            contact: contact,
            logo: logo,
            imageUrls: imageUrls,
        };

        try {

            const response = await updateProfileTsCompany(dataUpdate);


            if (response.status === 200) {
                setIsEditing(false)
                fetchProfileTsCompany();
                toast.success("Cập nhật thành công!!", { duration: 3000 });
            } else {
                console.error("Error updating profile.");
                toast.error("Xảy ra lỗi!!", { duration: 3000 });
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false); // Kết thúc quá trình lưu
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await uploadFileImage(formData);
            if (response.status === 200) {
                setLogo(response.data[0])
            }
        } catch (error) {

        }
    }

    const handleSelectAndUploadImages = async (e) => {
        const files = Array.from(e.target.files);
        try {
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);
                const response = await uploadMultipleFileImage(formData);
                if (response.status === 200) {
                    return response.data[0];
                } else {
                    throw new Error(`Failed to upload ${file.name}`);
                }
            });

            const uploadedUrls = await Promise.all(uploadPromises);

            setImageUrls((prev) => [
                ...prev,
                ...uploadedUrls
            ]);

        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };


    const handleRemoveImageCompany = (index) => {
        setImageUrls((prev) => prev.filter((_, i) => i !== index));
    };


    const handleCancelClick = () => {
        setIsEditing(false);
        setLogo(originalLogo);
        setImageUrls(imageUrlsOrigin)
    };

    return (
        <div className="max-w-6xl mx-auto">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="relative p-14 gap-4 min-h-screen mx-auto ">
                {/* Top-right Edit Icon */}
                <div className="absolute top-4 right-4">
                    {!isEditing ? (
                        <button
                            className="flex items-center gap-3 px-10 py-3 bg-gradient-to-r from-lime-300 to-green-700 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition"
                            onClick={handleEditClick}
                        >
                            <FaEdit className="h-5 w-5" />
                            <span>Chỉnh sửa hồ sơ</span>
                        </button>
                    ) : (
                        <div className="flex gap-4">
                            <button
                                onClick={handleCancelClick}
                                className="flex items-center gap-3 px-10 py-3 bg-gradient-to-r from-red-300 to-red-600 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition"
                            >
                                <span className="text-md">Hủy</span>
                            </button>
                            <button
                                className="flex items-center gap-3 px-10 py-3 bg-gradient-to-r from-blue-300 to-blue-600 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition"
                                onClick={handleUpdateProfileCompany}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <FaSpinner className="h-5 w-5 animate-spin" /> // Spinner khi đang tải
                                ) : (
                                    
                                    <span className="text-md flex gap-4 items-center"><FaSave className="h-5 w-5" /> Lưu thay đổi</span>
                                )}
                            </button>
                        </div>
                    )}

                </div>

                {/* Main Content */}
                <div className="flex">
                    {/* Left Section */}
                    <div className="grid grid-cols-3">
                        {/* Left Section */}
                        <div className="col-span-2 p-6 bg-white rounded-lg shadow-lg">
                            {/* Tên công ty */}
                            <h1 className="text-3xl font-semibold text-sky-700 pb-6 border-b-2 border-gray-200">
                                {!isEditing ? (
                                    `Công ty: ${profile.timeshareCompanyName || "N/A"}`
                                ) : (
                                    <div className="flex flex-col">
                                        <label htmlFor="companyName" className="text-xl font-semibold text-gray-700 mb-2">Tên công ty:</label>
                                        <input
                                            id="companyName"
                                            type="text"
                                            value={updatedCompanyName}
                                            onChange={(e) => setUpdatedCompanyName(e.target.value)}
                                            className="w-full border-2 border-sky-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-gray-700"
                                        />
                                    </div>
                                )}
                            </h1>

                            {/* Địa chỉ */}
                            <p className="text-lg mt-6">
                                {!isEditing ? (
                                    <span className="flex items-center gap-2 text-gray-700">
                                        <LocationMarkerIcon className="w-6 h-6 text-red-500" />
                                        <strong>Địa chỉ:</strong> {profile.address || "Không có thông tin"}
                                    </span>
                                ) : (
                                    <div className="flex flex-col">
                                        <label htmlFor="address" className="text-xl font-semibold text-gray-700 mb-2">Địa chỉ:</label>
                                        <input
                                            id="address"
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full border-2 border-sky-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-gray-700"
                                        />
                                    </div>
                                )}
                            </p>

                            {/* Giới thiệu */}
                            <p className="text-lg mt-6">
                                {!isEditing ? (
                                    <span className="text-gray-700  gap-2">
                                        <strong className="flex gap-2"> <InformationCircleIcon className="w-6 h-6 text-blue-500" />Giới thiệu</strong> {profile.description || "Không có thông tin"}
                                    </span>
                                ) : (
                                    <div className="flex flex-col">
                                        <label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <InformationCircleIcon className="w-6 h-6 text-blue-500" />
                                            Giới thiệu:
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="w-full border-2 border-sky-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-gray-700"
                                        />
                                    </div>
                                )}
                            </p>
                            <p className="text-lg mt-6">
                                {!isEditing ? (
                                    <span className="text-gray-700 flex items-center gap-2">
                                        <PhoneIcon className="w-6 h-6 text-green-500" />
                                        <strong>Liên hệ:</strong> {profile.contact || "Không có thông tin"}
                                    </span>
                                ) : (
                                    <div className="flex flex-col">
                                        <label htmlFor="contact" className="text-xl font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <PhoneIcon className="w-6 h-6 text-green-500" />
                                            Liên hệ:
                                        </label>
                                        <input
                                            id="contact"
                                            type="text"
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                            className="w-full border-2 border-sky-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xl text-gray-700"
                                        />
                                    </div>
                                )}
                            </p>

                            {/* Liên hệ */}


                        </div>


                        {/* Right Section */}
                        {/* Right Section */}
                        <div className="py-12 ml-16 col-span-1 w-full relative">
                            {/* Check if logo exists */}
                            {!isEditing ? (
                                logo ? (
                                    // Display the logo image and "X" icon if logo exists
                                    <div className="relative flex flex-col items-center">
                                        <img
                                            src={logo || "https://via.placeholder.com/300"}
                                            alt={profile.timeshareCompanyName || "Company Logo"}
                                            className="w-full h-auto object-contain mt-10 rounded-lg shadow-lg border-2"
                                        />
                                    </div>
                                ) : (
                                    // If no logo exists, show the upload button
                                    <div className="flex flex-col items-center justify-center space-y-2 mt-10 w-full">
                                        <p className="text-lg text-gray-500">Chưa có logo. Vui lòng tải lên.</p>
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                                            onClick={() => document.getElementById("logo-upload-input").click()}
                                        >
                                            Tải logo lên
                                        </button>
                                        <input
                                            type="file"
                                            id="logo-upload-input"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                )
                            ) : (
                                // During editing, show the current image and the "X" icon to remove
                                logo ? (
                                    <div className="relative flex flex-col items-center">
                                        <img
                                            src={logo || "https://via.placeholder.com/300"}
                                            alt={profile.timeshareCompanyName || "Current Logo"}
                                            className="w-full h-auto object-contain mt-10 rounded-lg shadow-lg border-2"
                                        />
                                        <button
                                            onClick={() => setLogo("")}
                                            className="absolute top-14 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                                            title="Remove Image"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center space-y-4 mt-10 w-full">
                                        <p className="text-lg text-gray-600 font-medium">Chưa có logo. Vui lòng tải lên.</p>

                                        <div className="flex flex-col items-center space-y-4">
                                            <button
                                                onClick={() => document.getElementById("logo-upload-input").click()}
                                                className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-300 space-x-3"
                                            >
                                                <FaUpload className="w-5 h-5 text-white" />
                                                <span>Tải logo lên</span>
                                            </button>

                                            <input
                                                type="file"
                                                id="logo-upload-input"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                            />
                                        </div>

                                        <div className="text-sm text-gray-500 mt-2">
                                            <p className="italic">Chúng tôi hỗ trợ các định dạng hình ảnh như PNG, JPEG, hoặc JPG.</p>
                                        </div>
                                    </div>

                                )
                            )}
                        </div>


                    </div>


                </div>

                {/* Image URLs Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-custom-blue-text">
                        Hình ảnh công ty:
                    </h2>
                    {isEditing && (
                        <div className="mt-4 flex justify-center py-6">
                            {/* Gắn `htmlFor` vào label để liên kết với input */}
                            <label htmlFor="photo-upload-input" className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    id="photo-upload-input"
                                    className="hidden"
                                    onChange={(e) => handleSelectAndUploadImages(e)}
                                />
                                {/* Nút sẽ kích hoạt input khi được nhấn */}
                                <button
                                    className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-300 space-x-3"
                                >
                                    <FaUpload className="w-5 h-5 text-white" />
                                    <span>Tải ảnh lên</span>
                                </button>
                            </label>
                        </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 py-6">
                        {imageUrls && imageUrls.length > 0 ? (
                            imageUrls.map((url, index) => (
                                <div
                                    key={index}
                                    className="relative group overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                                >
                                    {/* Hình ảnh */}
                                    <img
                                        src={url}
                                        onClick={() => handleOpenModalSwiper(url)}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-48 object-cover shadow-2xl hover:shadow-3xl group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Nút Remove (hiện khi hover) */}
                                    {isEditing && (
                                        <button
                                            onClick={() => handleRemoveImageCompany(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 duration-300"
                                            title="Remove Image"
                                        >
                                            <FaTimes className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center col-span-4">Không có hình ảnh để hiển thị.</p>
                        )}
                    </div>



                    {/* Add Image Button */}

                    {
                        openSwipper && (
                            <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
                                <div className=' p-2 rounded-lg max-w-5xl w-full relative'>
                                    <button
                                        className='absolute top-2 right-2 text-white p-1 rounded-full'
                                        onClick={closeModal}
                                    >
                                        <XIcon className='w-8' />
                                    </button>
                                    <div className='mb-4'>
                                        <img
                                            src={selectedImage}
                                            className='h-[500px] w-full object-cover rounded-lg'
                                            alt={`Slide ${selectedImage}`}
                                        />
                                    </div>
                                    <Swiper
                                        spaceBetween={10}
                                        slidesPerView={4}
                                    >
                                        {imageUrls && imageUrls.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={image}
                                                    className={`h-[100px] w-full object-cover rounded-lg cursor-pointer ${selectedImage === index ? 'border-4 border-blue-500' : ''}`} // Highlight the selected image
                                                    alt={`Thumbnail ${index}`}
                                                    onClick={() => setSelectedImage(image)} // Set image on click
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        )
                    }

                </div>

            </div>
        </div>
    );
};

export default ProfileTsCompany;
