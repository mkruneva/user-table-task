import { ReactNode, useMemo } from 'react'
import { SkeletonTable } from './skeleton-table'
import { usePagination } from './pagination/use-pagination'
import { Pagination } from './pagination'
import './table.scss'

/**
 * Represents the data for a cell with the ability for custom rendering.
 */
export interface RenderedCell<T> {
  /** Data of the cell that can be used in custom rendering. */
  rowData: T
}

/**
 * Defines a column in the table.
 * @template T - Type of the data for the whole row.
 * @template K - Type of the keys in row data.
 */
export interface TableColumn<T, K extends keyof T> {
  /** The display name of the column. */
  label: string
  /** The property name in the data from which to pull the cell's content. */
  accessor: K
  /** Optional custom renderer for each cell in this column. */
  renderCellContent?: (props: RenderedCell<T>) => ReactNode
}

/**
 * Props for the Configurable Table component.
 * @template T - General type for data to be displayed in the table.
 * @template K - Specific keys from data type `T` used in the table.
 */
export interface TableProps<T, K extends keyof T> {
  /** Array of data items to be displayed in the table. */
  data: T[]
  /** Configuration of columns to be displayed. */
  columns: TableColumn<T, K>[]
  /** Indicates if the table data is currently being loaded. */
  isLoading?: boolean
  /** Indicates if there has been an error during data fetching or processing. */
  error?: string | null
  /** Optional custom row function returning row configuration object props  */
  renderRow?: (
    rowData: T,
    index: number
  ) => React.HTMLAttributes<HTMLTableRowElement>
  /** Optional number of items per page for paginated table */
  itemsPerPage?: number
}

/** Base interface representing a required structure for table row data items. */
export interface BaseTableItem {
  /** Unique identifier for each row in the table. Can be a number or string. */
  id: number | string
}

/**
 * Configurable table component that displays data in a tabular format with support for custom cell rendering.
 * @template T - Ensures type safety for data items which extend BaseTableItem, providing an id.
 * @template K - Keys from the data type used to access item properties.
 */
export const Table = <T extends BaseTableItem, K extends keyof T>({
  data = [],
  columns,
  isLoading,
  error,
  renderRow,
  itemsPerPage = 10,
}: TableProps<T, K>) => {
  const {
    currentPage,
    totalPages,
    paginatedData: { startIndex, endIndex },
    handlePageChange,
  } = usePagination({
    totalItems: data.length,
    itemsPerPage,
  })

  const paginationLabel = useMemo(() => {
    const firstItemIndex = 1 + itemsPerPage * (currentPage - 1)
    const lastItemIndex = Math.min(data.length, currentPage * itemsPerPage)
    return `${firstItemIndex}-${lastItemIndex} of ${data.length} items`
  }, [currentPage, itemsPerPage, data.length])

  const currentData = data.slice(startIndex, endIndex)

  if (isLoading) return <SkeletonTable rows={10} columns={columns.length} />

  if (error) {
    return <div className="table-info error">{error}</div>
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead className="table__header">
          <tr className="table__header-row">
            {columns.map(({ accessor, label }) => (
              <th key={accessor as string} className="table__header-cell">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {currentData.map((row, index) => {
            const cells = columns.map(({ accessor, renderCellContent }) => (
              <td
                key={String(accessor)}
                className={`table__cell ${accessor as string}`}
              >
                {renderCellContent ? (
                  renderCellContent({ rowData: row })
                ) : (
                  <span>{row[accessor] as string}</span>
                )}
              </td>
            ))

            const rowProps = {
              className: 'table__row',
              'aria-rowindex': index + 1,
              ...(renderRow ? renderRow(row, index) : {}),
            }

            return (
              <tr key={row.id} {...rowProps}>
                {cells}
              </tr>
            )
          })}
        </tbody>
      </table>
      {!currentData?.length && <div className="table-info">No users found</div>}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        paginationLabel={paginationLabel}
      />
    </div>
  )
}
