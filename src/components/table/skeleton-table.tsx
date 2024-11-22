import './table.scss'
import './skeleton-table.scss'

export const SkeletonTable = ({ rows = 10, columns = 4 }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="table__header-cell">
                <div className="skeleton-block skeleton-block--header"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="table__row">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="table__cell">
                  <div
                    className={`skeleton-block ${
                      colIndex === 0
                        ? 'skeleton-block--circle avatar'
                        : 'skeleton-block--text'
                    }`}
                  ></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
