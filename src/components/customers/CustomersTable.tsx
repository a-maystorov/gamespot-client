import { Link } from "react-router-dom";
import Customer from "../../models/Customer";
import SortCol from "../../models/SortCol";
import AuthService from "../../services/AuthService";
import Table from "../common/Table";

interface CustomersTableProps {
  customers: Customer[];
  onRemoveCustomer: (id: string) => void;
  onSort: (sortColumn: SortCol) => void;
  sortColumn: SortCol;
}

function CustomersTable({ customers, onRemoveCustomer, onSort, sortColumn }: CustomersTableProps) {
  const columns = [
    {
      path: "name",
      label: "Name",
      content: (customer: any) => <Link to={`/customers/${customer._id}`}>{customer.name}</Link>,
    },
    { path: "phone", label: "Phone Number" },
  ];

  const deleteColumn = {
    path: "",
    label: "",
    key: "delete",
    content: (game: any) => (
      <button
        className="btn btn-danger btn-sm rounded-pill"
        onClick={() => onRemoveCustomer(game._id)}
      >
        Delete
      </button>
    ),
  };

  const user: any = AuthService.getUser();

  if (user && user.isAdmin) columns.push(deleteColumn);

  return <Table columns={columns} data={customers} onSort={onSort} sortColumn={sortColumn} />;
}

export default CustomersTable;
