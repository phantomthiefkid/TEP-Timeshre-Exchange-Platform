import React from 'react'

const Loading = () => {
  return (
    <div className="bg-gray-50 w-full h-screen flex justify-center items-center">
      <div className="flex">
        <div className="relative">
       
          <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>

        
          <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-b-gray-700 border-t-transparent"></div>
        </div>
      </div>
    </div>




  )
}

export default Loading