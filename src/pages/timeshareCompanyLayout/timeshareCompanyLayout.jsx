import React from "react";
import { Outlet } from "react-router-dom";
import SidebarTimeshareCompany from "../../components/Sidebar/sidebarTimeshareCompany";
import SidebarTimeshareStaff from "../../components/Sidebar/sidebarTimeshareStaff";
const TimeshareCompanyLayout = () => {
  return (
    <div className="flex">
      <SidebarTimeshareCompany />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default TimeshareCompanyLayout;
