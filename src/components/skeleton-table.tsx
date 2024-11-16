import "./skeleton-table.scss";
import "./user-table.scss";

export const SkeletonTable = ({ rows = 10, columns = 4 }) => {
  return (
    <div className="user-table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="user-table__header-cell">
                <div className="skeleton-block skeleton-block--header"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="user-table__row">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="user-table__cell">
                  <div
                    className={`skeleton-block ${
                      colIndex === 0
                        ? "skeleton-block--circle avatar"
                        : "skeleton-block--text"
                    }`}
                  ></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
