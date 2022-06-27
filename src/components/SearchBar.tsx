interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ onChange, value }: SearchBarProps) {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchBar;
