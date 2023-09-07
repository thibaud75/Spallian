import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPagination = () => {
    const buttons = [];

    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <button
          key={page}
          className={`PaginationButton ${
            page === currentPage ? "ActivePage" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      );
    }

    return buttons;
  };

  return <div className="PaginationContainer">{renderPagination()}</div>;
};

export default Pagination;
