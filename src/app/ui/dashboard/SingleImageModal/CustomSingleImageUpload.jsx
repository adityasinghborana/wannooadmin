// ImageUploadModal.js

import React, { useEffect } from 'react';
import Modal from 'react-modal';

const ImageUploadModal = ({ isOpen, onClose, imagePreview, onConfirm, name }) => {

  const confirm = () =>{
    if(name) {
      onConfirm(name)
    }else{
      onConfirm()
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Upload Confirmation Modal"
      className="modal-content"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4">Confirm Image Upload</h2>
        <img src={imagePreview} alt="Image Preview" className="mb-4" style={{ maxWidth: '100%', maxHeight: '400px' }} />
        <div className="flex gap-4">
          <button onClick={()=>confirm()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Confirm</button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
