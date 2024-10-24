import React from 'react'

const LoadingWaitingComponent = () => {
  return (
    <div class="flex">
      <div class="relative">

        <div class="w-12 h-12 rounded-full absolute
    border-4 border-solid border-gray-200"></div>


        <div class="w-12 h-12 rounded-full animate-spin absolute
    border-4 border-solid border-gray-500 border-t-transparent shadow-md"></div>
      </div>
    </div>


  )
}

export default LoadingWaitingComponent