import React from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null; // Don't render anything if modal is not open

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="bg-white p-8">
            <p className="text-lg font-semibold text-center">{title}</p>
            <p className="text-center">{message}</p>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
