import React from 'react'

const loadingWaitingComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
  <div className="relative">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400 border-solid border-opacity-20"></div>
    <div className="absolute inset-0 rounded-full border-t-4 border-blue-600 border-solid animate-spin-slow"></div>
  </div>
  <p className="text-xl font-semibold text-blue-600">Đang tải, vui lòng chờ...</p>
</div>


    )
}

export default loadingWaitingComponent