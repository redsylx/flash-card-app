import React, { ReactElement } from 'react';

interface CustomPopupProps {
  isOpen: boolean,
  children: ReactElement;
}

const CustomPopup : React.FC<CustomPopupProps> = ({ isOpen, children }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="flex flex-col justify-between bg-bg p-8 rounded-lg shadow-lg max-w-sm w-full">
        {children}
      </div>
    </div>
  );
};

export {
  CustomPopup
}
