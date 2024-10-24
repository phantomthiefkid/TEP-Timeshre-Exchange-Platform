import React from 'react'

const Loading = () => {
  return (
    <div className="bg-gray-50 w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-solid border-blue-300 border-t-transparent animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full shadow-lg"></div>
          </div>
        </div>
        <p className="text-blue-700 font-semibold text-lg">Loading...</p>
      </div>
    </div>


  )
}

export default Loading