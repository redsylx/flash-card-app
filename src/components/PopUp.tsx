import React, { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setIsOpen } from '../reducers/popUp';

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

const Popup = () => {
  const dispatch = useAppDispatch();
  const isPopupOpen = useAppSelector((p) => p.popUp.isOpen);

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="flex flex-col justify-between bg-bg p-8 rounded-lg shadow-lg max-w-sm w-full h-80">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-main">This is a pop-up!</h2>
          <p className="text-text">You can put any content you want here.</p>
        </div>
        <button
          className="custom-button text-text py-2 px-4 rounded"
          onClick={() => dispatch(setIsOpen(false))}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
export {
  CustomPopup
}
