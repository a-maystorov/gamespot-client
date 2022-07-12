import Column from '../../models/Column';
import Customer from '../../models/Customer';
import Game from '../../models/Game';
import Rental from '../../models/Rental';
import SortCol from '../../models/SortCol';

import TableBody from './TableBody';
import TableHeader from './TableHeader';

interface TableProps {
  columns: Column[];
  data: Game[] | Customer[] | Rental[];
  onSort: (sortColumn: SortCol) => void;
  sortColumn: SortCol;
}
function Table({ columns, data, onSort, sortColumn }: TableProps) {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;
