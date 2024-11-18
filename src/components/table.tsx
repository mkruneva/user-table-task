import { ReactNode } from "react";
import { SkeletonTable } from "./skeleton-table";
import "./table.scss";

export interface RenderedCell<T> {
  /** An object with data for a cell with a custom component */
  cellData: T;
}

export interface TableColumn<T, K extends keyof T> {
  /** Displayed column name */
  label: string;
  /** The key for displaying data that is taken from the list of table data */
  accessor: K;
  // TODO: fix type
  renderCellContent?: (props: RenderedCell<T> | any) => ReactNode;
}

/**
 * The interface of a table body component
 *
 * @template T Basic data interface
 * @template K List of keys from the `T` base interface
 */ interface TableProps<T, K extends keyof T> {
  /** The data for the table to display */
  data: T[];
  /** The list of columns to display in the table */
  columns: TableColumn<T, K>[];
  /**
   * Whether the body of the table is loaded. If `true`, the `<Loader />` is displayed
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * Are there any errors in the request. If `true`, an empty table is displayed
   *
   * @default false
   */
  isErrored?: boolean;
}

/** The basic interface of the table data */
export interface MinTableItem {
  /** A unique ID for a table row */
  id: number | string;
}

/**
 * This component is used to display data in the form of a table.
 */
export const Table = <T extends MinTableItem, K extends keyof T>({
  data,
  columns,
  isLoading,
  isErrored,
}: TableProps<T, K>) => {
  if (isLoading) return <SkeletonTable rows={10} columns={4} />;

  // TODO: better styling for error states
  if (isErrored) return <div>Something went wrong</div>;

  if (!isLoading && !isErrored && !data?.length)
    return <div>No users found</div>;

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead className="table__header">
          <tr className="table__header-row">
            {columns.map(({ accessor, label }) => (
              <th key={String(accessor)} className="table__header-cell">
                {String(label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map((row) => (
            <tr key={row.id} className="table__row">
              {columns.map(({ accessor, renderCellContent }) => (
                <td
                  key={String(accessor)}
                  className={`table__cell ${String(accessor)}`}
                >
                  {renderCellContent ? (
                    // TODO: fix type here
                    renderCellContent(row as any)
                  ) : (
                    // TODO: fix type here
                    <span>{row[accessor] as any} </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// TODO: TASKS:
// pagination or react-visibility-sensor (Intersection Observe)
// image optimisation ?
// Search with deboounce

// ?
// using style import from scss vs current implementation
//

// Done
// // type for the table
