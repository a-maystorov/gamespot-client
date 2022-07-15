import React from 'react';

interface InputProps {
  name: string;
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  errors: string | undefined;
}

function Input({ label, name, errors, ...rest }: InputProps) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="mt-3">
        {label}
      </label>
      <input name={name} id={name} className="form-control" {...rest} />
      {errors && (
        <div className="form-control alert-danger rounded-pill mt-3">
          {errors}
        </div>
      )}
    </div>
  );
}

export default Input;
