const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };
  return (
      <div className="flex justify-center my-4">
        {totalPages > 1 && (
          <>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="mr-2 py-2 px-4 bg-blue-500 text-white rounded-l"
            >
              Prev
            </button>
            {currentPage + 1} / {totalPages}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-r"
            >
              Next
            </button>
          </>
        )}
      </div>
    );
};

export default CustomPagination