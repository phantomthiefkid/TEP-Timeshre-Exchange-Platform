import { Link } from "react-router-dom";
import { markReadById } from "../../../service/notificationService/notiicationAPI";
import React, { useRef, useEffect } from "react";
const NotificationModalSystemStaff = ({ onClose, content, onMarkAllRead, onClick }) => {
    const modalRef = useRef(null);
    const handleMarkRead = async (notiId) => {
        try {
            await markReadById(notiId)

        } catch (error) {
            throw error
        }

    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClick(); // Close the modal if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClick]);
    return (
        <div
            ref={modalRef}
            className="absolute left-6 top-6 right-0 w-96 bg-slate-50 border-2 rounded-lg shadow-xl z-50">
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Thông báo hệ thống</h2>
                <button
                    onClick={(event) => {
                        event.stopPropagation(); // Prevent modal from closing
                        // Logic to mark all notifications as read
                        onMarkAllRead()
                    }}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Đánh dấu tất cả đã xem
                </button>
            </div>
            <div className="p-4 space-y-3">
                {content.length > 0 ? (
                    <div className="max-h-[calc(10*72px)] overflow-y-auto">
                        {content.map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 relative p-4 rounded-lg shadow-sm hover:bg-slate-100 flex items-start space-x-3"
                            >
                                {/* Logo */}
                                <img
                                    src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1732484223950_2 (2).png"
                                    alt="Logo"
                                    className="w-10 h-10 object-cover border-2 rounded-full"
                                />
                                {/* Notification Content */}
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-gray-800">{item.title}</h3>
                                    <Link
                                        onClick={() => {
                                            if (!item.isRead) handleMarkRead(item.id); // Only run if the notification is unread
                                        }}
                                        to={`/systemstaff/valuationlist`}
                                    >
                                        <p className="text-sm text-gray-600">{item.content}</p>
                                    </Link>
                                    <span className="text-xs absolute right-4 text-gray-400">
                                        {item.createdAt}
                                    </span>
                                    {item.isRead ? (
                                        <div className="w-3 h-3 bg-gray-400 rounded-full absolute top-14 right-4"></div>
                                    ) : (
                                        <div className="w-3 h-3 bg-green-500 rounded-full absolute top-14 right-4"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-sm text-gray-500">Không có thông báo nào.</div>
                )}
            </div>

            <div className="p-4 border-t text-center">
                <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={onClose}
                >
                    Đóng thông báo
                </button>
            </div>
        </div>
    );
};

export default NotificationModalSystemStaff;
