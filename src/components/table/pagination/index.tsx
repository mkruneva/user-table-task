import './pagination.scss'

export const Pagination = ({
  currentPage,
  totalPages,
  paginationLabel,
  onPageChange,
  isLoading,
}: {
  currentPage: number
  totalPages: number
  paginationLabel?: string
  onPageChange: (page: number) => void
  isLoading?: boolean
}) => (
  <div className="pagination-container">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1 || isLoading}
      className="pagination__button pagination__button-prev"
    >
      Previous
    </button>
    <span className="pagination__label">
      {isLoading
        ? '...'
        : paginationLabel
          ? paginationLabel
          : `Page ${currentPage} of ${totalPages}`}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages || isLoading}
      className="pagination__button pagination__button-next"
    >
      Next
    </button>
  </div>
)
