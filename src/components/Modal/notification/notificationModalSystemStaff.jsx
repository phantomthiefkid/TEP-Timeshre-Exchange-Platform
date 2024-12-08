import React, { useState, useEffect } from "react";


const NotificationModalSystemStaff = ({ onClose, content }) => {
    const [notifications, setNotifications] = useState([]); // State to store notifications

  

    return (
        <div className="absolute left-6 top-6 right-0 w-96 bg-slate-50 border-2 rounded-lg shadow-xl z-50">
            <div className="p-4 border-b">
                <h2 className="text-lg font-bold text-gray-800">Thông báo hệ thống</h2>
            </div>
            <div className="p-4 space-y-3">
                {content.length > 0 ? (
                    content.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 relative p-3 rounded-lg shadow-sm hover:bg-slate-100 flex items-start space-x-3"
                        >
                            {/* Logo */}
                            <img
                                src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1732484223950_2 (2).png"
                                alt="Logo"
                                className="w-12 h-12 object-cover border-2 rounded-full"
                            />
                            {/* Notification Content */}
                            <div>
                                <p className="text-sm text-gray-600">{item.body}</p>
                                <span className="text-xs absolute right-4 text-gray-400">
                                    {item.time}
                                </span>
                            </div>
                        </div>
                    ))
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
