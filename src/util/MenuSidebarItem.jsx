import { UsersIcon, ClipboardCheckIcon, LibraryIcon, QuestionMarkCircleIcon, ChartBarIcon, ClipboardListIcon, ThumbUpIcon } from '@heroicons/react/solid';

export const menuAdminItem = [
    {
      path: "usermanagement",
      name: "Quản lí người dùng",
      icon: <UsersIcon className="h-6 w-6" />,
      visible: true,
      color: "#E3463F"
    },
    {
      path: "resortmanagement",
      name: "Quản lí resort",
      icon: <LibraryIcon  className="h-6 w-6" />,
      visible: true,
      color: "#C49A68"
    },
    {
      path: "tracklogmanagement",
      name: "Track log",
      icon: <ClipboardCheckIcon className="h-6 w-6" />,
      visible: true,
      color: "#4361EE"
    }
  ];

  export const menuSystemStaffItem = [
    {
      path: "dashboard",
      name: "Dashboard",
      icon:<ChartBarIcon className="h-6 w-6" />,
      visible: true,
      color: "#EE6457"
    },
    {
      path: "post",
      name: "Quản lí bài đăng",
      icon: <ClipboardListIcon  className="h-6 w-6" />,
      visible: true,
      color: "#4CC9F0"
    },
    {
      path: "faqs",
      name: "Danh sách FAQs",
      icon: <QuestionMarkCircleIcon  className="h-6 w-6" />,
      visible: true,
      color: "#8B939C"
    }
  ];

  export const menuTimeshareCompany = [
    {
      path: "resortmanagementtsc",
      name: "Quản lý resort",
      icon:<ChartBarIcon className="h-6 w-6" />,
      visible: true,
      color: "#EE6457"
    },
    {
      path: "employeemanagement",
      name: "Quản lý nhân viên",
      icon: <ClipboardListIcon  className="h-6 w-6" />,
      visible: true,
      color: "#4CC9F0"
    }
  ];

  export const menuTimeshareStaff = [
    {
      path: "rentalmanagement",
      name: "Danh sách cho thuê",
      icon:<ChartBarIcon className="h-6 w-6" />,
      visible: true,
      color: "#EE6457"
    },
    {
      path: "requestmanagement",
      name: "Danh sách yêu cầu",
      icon: <ClipboardListIcon  className="h-6 w-6" />,
      visible: true,
      color: "#4CC9F0"
    },
    {
      path: "feedback",
      name: "Đánh giá khách hàng",
      icon: <ThumbUpIcon  className="h-6 w-6" />,
      visible: true,
      color: "#89B449"
    }
  ];