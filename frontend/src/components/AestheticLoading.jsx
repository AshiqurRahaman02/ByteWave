import React from "react";

const AestheticLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-gray-600 font-semibold mb-2">Loading Data...</p>
      <div className="w-16 h-16 border-t-4 border-teal-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default AestheticLoading;
