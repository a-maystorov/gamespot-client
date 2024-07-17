import _ from "lodash";
import Column from "../../models/Column";
import Customer from "../../models/Customer";
import Game from "../../models/Game";
import Rental from "../../models/Rental";

interface TableBodyProps {
  data: any[];
  columns: Column[];
}

function TableBody({ data, columns }: TableBodyProps) {
  const renderCell = (item: Game | Customer | Rental, column: Column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item: Game | Customer | Rental, column: Column) =>
    item._id! + (column.path || column.key);

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
