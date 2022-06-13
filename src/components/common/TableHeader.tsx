import SortCol from '../../models/SortCol';
import Column from '../../models/Column';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

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

  const renderSortIcon = (column: SortCol | Column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <FontAwesomeIcon icon={faSortUp} />;
    return <FontAwesomeIcon icon={faSortDown} />;
  };

  return (
    <thead className="table-dark">
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            className="clickable"
            onClick={() => raiseSort(column.path)}>
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
