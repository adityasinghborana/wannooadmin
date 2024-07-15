const ImageModalGrid = ({ images, handleImageSelect, selectedImages, currentPage, imagesPerPage }) => {
  const style = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2px',
      height: '400px',
      [`@media (maxWidth: 600px)`]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    },
    imageContainer: {
      position: 'relative',
      height: '190px',
      width: '300px',
      [`@media (maxWidth: 600px)`]: {
        height: '200px',
        width: '100%',
      },
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      border: '1px solid #ccc',
      cursor: 'pointer',
    },
    checkbox: {
      position: 'absolute',
      top: '0',
      left: '0',
      backgroundColor: '#3b82f6',
      color: '#fff',
      padding: '4px',
      borderRadius: '50%',
      marginTop: '8px',
      marginLeft: '8px',
    },
  };

  return (
    <div style={style.container}>
      {images.map((image, index) => (
        <div key={index} style={style.imageContainer}>
          <img
            src={process.env.NEXT_PUBLIC_URL + image.url}
            alt={image.url}
            style={style.image}
            onClick={() => handleImageSelect(image.url)}
          />
          {selectedImages.includes(image.url) && (
            <span style={style.checkbox}>
              ✓
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageModalGrid;

