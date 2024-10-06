import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarTimeshareStaff from '../../components/Sidebar/sidebarTimeshareStaff'
const TimeshareStaffLayout = () => {
    return (
        <div className='flex'>
            <SidebarTimeshareStaff />
            <div className='flex-grow p-6'>
                <Outlet />
            </div>
        </div>
    )
}

export default TimeshareStaffLayout