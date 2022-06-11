import SortCol from '../../models/SortCol';
import Column from '../../models/Column';

interface TableHeaderProps {
  columns: Column[];
  onSort: (sortColumn: SortCol) => void;
  sortColumn: SortCol;
}

function TableHeader({ columns, onSort, sortColumn }: TableHeaderProps) {
  const raiseSort = (path: string) => {
    const sortCol = { ...sortColumn };
    if (sortCol.path === path)
      sortCol.order = sortCol.order === 'asc' ? 'desc' : 'asc';
    else {
      sortCol.path = path;
      sortCol.order = 'asc';
    }
    onSort(sortCol);
  };

  return (
    <thead className="table-dark">
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            className="clickable"
            onClick={() => raiseSort(column.path)}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
