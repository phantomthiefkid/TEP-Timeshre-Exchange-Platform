import React from "react";
import { Outlet } from "react-router-dom";
import SidebarTimeshareStaff from "../../components/Sidebar/sidebarTimeshareStaff";
import Header from "../../components/Header/headerTimeshareStaff";

const TimeshareStaffLayout = () => {
  return (
    <div className="flex">
      <SidebarTimeshareStaff />
      <div className="flex-grow">
        <Header className="w-full" />
        <Outlet />
      </div>
    </div>
  );
};

export default TimeshareStaffLayout;
