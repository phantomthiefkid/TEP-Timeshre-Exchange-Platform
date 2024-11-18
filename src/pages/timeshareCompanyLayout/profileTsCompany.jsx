import React, { useEffect, useState } from "react";
import { getProfileTsCompany, updateProfileTsCompany } from "../../service/tsCompanyService/tsCompanyAPI";
import { FaEdit, FaRemoveFormat, FaSave, FaTimes } from "react-icons/fa"; // Import an icon for editing
import { uploadFileImage } from "../../service/uploadFileService/uploadFileAPI";

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
            } else {
                console.error("Error updating profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
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
    const handleCancelClick = () => {
        setIsEditing(false);
        setLogo(originalLogo); // Restore original logo on cancel
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="relative p-14 gap-4 min-h-screen mx-auto border-l-2 border-r-2">
                {/* Top-right Edit Icon */}
                <div className="absolute top-4 right-4">
                    {!isEditing ? (
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
                            onClick={handleEditClick}
                        >
                            <FaEdit className="h-5 w-5" />
                            Chỉnh sửa hồ sơ
                        </button>
                    ) : (
                        <div className="flex gap-4">
                            <button onClick={handleCancelClick} className="flex items-center gap-2 px-8 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition">
                                Hủy
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition"
                                onClick={handleUpdateProfileCompany}
                            >
                                <FaSave className="h-5 w-5" />
                                Lưu thay đổi
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex">
                    {/* Left Section */}
                    <div className="flex">
                        {/* Left Section */}
                        <div className="w-2/3">
                            {/* Company Name */}
                            <h1 className="text-4xl font-bold text-custom-blue-text py-12">
                                {!isEditing ? (
                                    `Công ty: ${profile.timeshareCompanyName || "N/A"}`
                                ) : (
                                    <div>
                                        <label htmlFor="companyName" className="text-xl font-semibold">Tên công ty:</label>
                                        <input
                                            id="companyName"
                                            type="text"
                                            value={updatedCompanyName}
                                            onChange={(e) => setUpdatedCompanyName(e.target.value)}
                                            className="w-full border-b-2 border-blue-500 focus:outline-none text-4xl font-bold text-custom-blue-text py-1"
                                        />
                                    </div>
                                )}
                            </h1>

                            {/* Address */}
                            <p className="text-lg mt-4">
                                {!isEditing ? (
                                    <span><strong>Địa chỉ:</strong> {profile.address || "Không có thông tin"}</span>
                                ) : (
                                    <div>
                                        <label htmlFor="address" className="text-xl font-semibold">Địa chỉ:</label>
                                        <input
                                            id="address"
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full border-b-2 border-blue-500 focus:outline-none text-2xl py-1"
                                        />
                                    </div>
                                )}
                            </p>

                            {/* Description */}
                            <p className="text-lg mt-4">
                                {!isEditing ? (
                                    <span><strong>Giới thiệu:</strong>  {profile.description || "Không có thông tin"}</span>
                                ) : (
                                    <div>
                                        <label htmlFor="description" className="text-xl font-semibold">Giới thiệu:</label>
                                        <textarea
                                            id="description"
                                            cols={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="w-full border-b-2 border-blue-500 focus:outline-none text-2xl py-1"
                                        />
                                    </div>
                                )}
                            </p>

                            {/* Contact */}
                            <p className="text-lg mt-4">
                                {!isEditing ? (
                                    <span><strong>Liên hệ:</strong>  {profile.contact || "Không có thông tin"}</span>
                                ) : (
                                    <div>
                                        <label htmlFor="contact" className="text-xl font-semibold">Liên hệ:</label>
                                        <input
                                            id="contact"
                                            type="text"
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                            className="w-full border-b-2 border-blue-500 focus:outline-none text-2xl py-1"
                                        />
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* Right Section */}
                        <div className="py-12 ml-16 w-1/3 relative">
                            {/* Check if logo exists */}
                            {!isEditing ? (
                                logo ? (
                                    // Display the logo image and "X" icon if logo exists
                                    <div className="relative">
                                        <img
                                            src={logo || "https://via.placeholder.com/300"}
                                            alt={profile.timeshareCompanyName || "Company Logo"}
                                            className="w-full h-auto object-contain mt-10 rounded-lg shadow-lg border-2"
                                        />

                                    </div>
                                ) : (
                                    // If no logo exists, show the upload button
                                    <div className="flex flex-col items-center justify-center space-y-2 mt-10">
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
                                logo ? (<div className="relative">
                                    <img
                                        src={logo || "https://via.placeholder.com/300"}
                                        alt={profile.timeshareCompanyName || "Current Logo"}
                                        className="w-full h-auto object-contain mt-10 rounded-lg shadow-lg border-2"
                                    />
                                    <button
                                        onClick={() => setLogo("")}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                                        title="Remove Image"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>) : (<div className="flex flex-col items-center justify-center space-y-2 mt-10">
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
                                </div>)
                            )}
                        </div>

                    </div>


                </div>

                {/* Image URLs Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-custom-blue-text">
                        Hình ảnh công ty:
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {profile.imageUrls && profile.imageUrls.length > 0 ? (
                            profile.imageUrls.map((url, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={url}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-40 object-cover rounded-lg shadow-md"
                                    />

                                    {/* Remove Icon */}
                                    {isEditing && (
                                        <button

                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 transition hover:bg-red-600"
                                            title="Remove Image"
                                        >
                                            <FaTimes className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Không có hình ảnh để hiển thị.</p>
                        )}
                    </div>

                    {/* Add Image Button */}
                    {isEditing && (
                        <div className="mt-4">
                            <button

                                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                            >
                                Thêm ảnh
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProfileTsCompany;
