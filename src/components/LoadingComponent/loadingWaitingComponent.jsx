import React from "react";

const LoadingWaitingComponent = () => {
  return (
    <div className="flex">
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full absolute
    border-4 border-solid border-gray-200"
        ></div>

        <div
          className="w-12 h-12 rounded-full animate-spin absolute
    border-4 border-solid border-gray-500 border-t-transparent shadow-md"
        ></div>
      </div>
    </div>
  );
};

export default LoadingWaitingComponent;
