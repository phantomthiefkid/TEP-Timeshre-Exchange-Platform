import React from 'react'

const Loading = () => {
  return (
    <div className="bg-gray-100 w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          </div>
        </div>
        <p className="text-gray-500 font-medium text-lg">Đang tải...</p>
      </div>
    </div>

  )
}

export default Loading