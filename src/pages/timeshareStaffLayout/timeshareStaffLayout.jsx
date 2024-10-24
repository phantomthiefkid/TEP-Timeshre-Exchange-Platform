import React from "react";
import { Outlet } from "react-router-dom";
import SidebarTimeshareStaff from "../../components/Sidebar/sidebarTimeshareStaff";
import Header from "../../components/Header/headerTimeshareStaff";

const TimeshareStaffLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarTimeshareStaff className="fixed left-0 top-0 h-full" />

      <div className="flex-grow  bg-gray-50 flex flex-col">
        <Header className="w-full" />

        <div className="flex-grow p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TimeshareStaffLayout;
