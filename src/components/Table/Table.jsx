const Table = ({ columns, data }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header} className="px-4 py-2 text-left">{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.accessor} className="border px-4 py-2">
                {column.render ? column.render(row) : row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
