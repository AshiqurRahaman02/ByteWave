import React from "react";

const ReplyLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-gray-600 font-semibold mb-2">Loading Reply Data...</p>
      <div className="w-16 h-16 rounded-full border-t-4 border-teal-500 animate-spin shadow-lg"></div>
    </div>
  );
};

export default ReplyLoading;
