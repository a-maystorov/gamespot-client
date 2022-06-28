import Genre from '../../models/Genre';

interface SelectProps {
  name: string;
  label: string;
  options: Genre[];
  errors: string | undefined;
}
const Select = ({ name, label, options, errors, ...rest }: SelectProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {errors && (
        <div className="form-control alert-danger rounded-pill mt-3">
          {errors}
        </div>
      )}
    </div>
  );
};

export default Select;
