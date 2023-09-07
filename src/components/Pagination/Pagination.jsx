import React from "react";
import "./Pagination.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPagination = () => {
    return Array.from({ length: totalPages }).reduce((buttons, _, page) => {
      buttons.push(
        <button
          key={page + 1}
          className={`PaginationButton ${
            page + 1 === currentPage ? "ActivePage" : ""
          }`}
          onClick={() => onPageChange(page + 1)}
        >
          {page + 1}
        </button>
      );
      return buttons;
    }, []);
  };

  return <div className="PaginationContainer">{renderPagination()}</div>;
};

export default Pagination;
