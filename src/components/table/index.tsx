import { ReactNode } from 'react'
import { SkeletonTable } from './skeleton-table'
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
}: TableProps<T, K>) => {
  if (isLoading) return <SkeletonTable rows={10} columns={columns.length} />

  if (error) {
    return <div className="table-info error">{error}</div>
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead className="table__header">
          <tr className="table__header-row">
            {columns.map(({ accessor, label }, colIndex) => (
              <th
                key={`${String(accessor)}-${colIndex}`}
                className="table__header-cell"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map((row, index) => {
            const cells = columns.map(
              ({ accessor, renderCellContent }, colIndex) => (
                <td
                  key={`${String(accessor)}-${colIndex}`}
                  className={`table__cell ${accessor as string}`}
                >
                  {renderCellContent ? (
                    renderCellContent({ rowData: row })
                  ) : (
                    <span>{row[accessor] as string}</span>
                  )}
                </td>
              )
            )

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
      {!data?.length && <div className="table-info">No users found</div>}
    </div>
  )
}
