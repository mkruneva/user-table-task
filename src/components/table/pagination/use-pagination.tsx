import { useState, useMemo, useEffect } from 'react'

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  initialPage?: number
}

export function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [totalItems])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return { startIndex, endIndex }
  }, [currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return {
    currentPage,
    totalPages,
    paginatedData,
    handlePageChange,
  }
}
