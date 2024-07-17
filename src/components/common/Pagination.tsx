import _ from "lodash";

interface PaginationProps {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ itemsCount, pageSize, currentPage, onPageChange }: PaginationProps) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount === 1) return null;

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pages.map((page: number) => (
          <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
