import _ from 'lodash';
import Column from '../../models/Column';
import Game from '../../models/Game';

interface TableBodyProps {
  data: Game[];
  columns: Column[];
}

function TableBody({ data, columns }: TableBodyProps) {
  const renderCell = (item: Game, column: Column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item: Game, column: Column) =>
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
