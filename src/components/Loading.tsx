import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-4 h-4 bg-sub rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-sub rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-sub rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;