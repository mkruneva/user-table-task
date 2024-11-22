import './pagination.scss'

export const Pagination = ({
  currentPage,
  totalPages,
  paginationLabel,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  paginationLabel?: string
  onPageChange: (page: number) => void
}) => (
  <div className="pagination-container">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="pagination__button pagination__button-prev"
    >
      Previous
    </button>
    <span className="pagination__label">
      {paginationLabel ? paginationLabel : `${currentPage} of ${totalPages}`}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="pagination__button pagination__button-next"
    >
      Next
    </button>
  </div>
)
