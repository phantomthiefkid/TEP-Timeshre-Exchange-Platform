import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarTimeshareCompany from '../../components/Sidebar/sidebarTimeshareCompany'
const TimeshareCompanyLayout = () => {
    return (
        <div className='flex'>
            <SidebarTimeshareCompany />
            <div className='flex-grow p-6'>
                <Outlet />
            </div>
        </div>
    )
}

export default TimeshareCompanyLayout