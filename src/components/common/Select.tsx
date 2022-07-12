interface SelectProps {
  name: string;
  label: string;
  options: any[];
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: any;
}
const Select = ({
  name,
  label,
  options,
  onChange,
  value,
  placeholder,
  ...rest
}: SelectProps) => {
  return (
    <div className="form-group mt-3">
      <label htmlFor={name}>{label}</label>

      <select
        name={name}
        id={name}
        className="form-control rounded-pill"
        onChange={onChange}
        {...rest}>
        <option value="" label={placeholder} />

        {options.map(
          (option) =>
            option._id && (
              <option {...rest} key={option._id} value={option._id}>
                {option.name || option.title}
              </option>
            )
        )}
      </select>
    </div>
  );
};

export default Select;
