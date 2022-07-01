import Genre from '../../models/Genre';

interface SelectProps {
  name: string;
  label: string;
  options: Genre[];
  value: string | number | undefined;
  errors: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: any;
}
const Select = ({
  name,
  label,
  options,
  errors,
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
                {option.name}
              </option>
            )
        )}
      </select>
      {/* {errors && (
        <div className="form-control alert-danger rounded-pill mt-3">
          {errors}
        </div>
      )} */}
    </div>
  );
};

export default Select;
