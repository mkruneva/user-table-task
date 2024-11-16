import "./user-table.scss";

type UserTableProps = {
  data: {
    id: string;
    image: string;
    email: string;
    phone: string;
    name: string;
  }[];
  // TODO: kay of data
  columns: Array<"id" | "image" | "email" | "phone" | "name">;
  renderCellContent?: (props: CustomCellRendererProps) => string | JSX.Element;
};

export const UserTable = ({
  data,
  columns,
  renderCellContent = customCellRenderer,
}: UserTableProps) => {
  return (
    <div className="user-table-wrapper">
      <table className="user-table">
        <thead className="user-table__header">
          <tr className="user-table__header-row">
            {columns.map((col) => (
              <th key={col} className="user-table__header-cell">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="user-table__body">
          {data.map((row) => (
            <tr key={row.id} className="user-table__row">
              {columns.map((col) => (
                <td key={col} className={`user-table__cell ${col}`}>
                  {renderCellContent ? (
                    renderCellContent({
                      cellData: row[col],
                      row,
                      column: col,
                    })
                  ) : (
                    <span>row[col]</span>
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

type CustomCellRendererProps = {
  cellData: string;
  // TODO: row type
  row: any;
  column: string;
};

const customCellRenderer = ({
  cellData,
  row,
  column,
}: CustomCellRendererProps) => {
  if (column === "image") {
    return (
      <img className="avatar" src={cellData} alt={`${row.name}'s avatar`} />
    );
  }
  if (column === "name") {
    return <strong>{cellData}</strong>;
  }
  return cellData;
};

// pagination or react-visibility-sensor
// image optimisation
