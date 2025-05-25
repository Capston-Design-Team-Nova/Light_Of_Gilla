import React from "react";
import {
  PaginationWrapper,
  PageButton,
  ActivePageButton,
} from "../styles/CommunityStyles";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages === 0) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <PaginationWrapper>
      <PageButton onClick={() => onPageChange(1)}>«</PageButton>
      <PageButton onClick={handlePrev}>{"<"}</PageButton>

      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return page === currentPage ? (
          <ActivePageButton key={page}>{page}</ActivePageButton>
        ) : (
          <PageButton key={page} onClick={() => onPageChange(page)}>
            {page}
          </PageButton>
        );
      })}

      <PageButton onClick={handleNext}>{">"}</PageButton>
      <PageButton onClick={() => onPageChange(totalPages)}>»</PageButton>
    </PaginationWrapper>
  );
}

export default Pagination;
