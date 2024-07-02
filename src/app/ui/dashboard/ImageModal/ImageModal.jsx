import ImageModalContent from "./ImageModalContent";

const ImageModal = ({ ...props }) => {
    return (
      <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-2xl shadow-lg w-3/4 max-w-2xl overflow-y-auto" style={{maxHeight: 'calc(100vh - 4rem)', height: '100vh', width: '80%', scrollbarWidth: 'none' }}>
          <ImageModalContent {...props} />
        </div>
      </div>
    );
  };

  export default ImageModal;