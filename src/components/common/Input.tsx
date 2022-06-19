import React from 'react';

interface InputProps {
  name: string;
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  errors: string | undefined;
}

function Input({ label, name, type, onChange, value, errors }: InputProps) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="mt-3">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className="form-control rounded-pill"
        onChange={onChange}
        value={value}
      />
      {errors && (
        <div className="form-control alert-danger rounded-pill mt-3">
          {errors}
        </div>
      )}
    </div>
  );
}

export default Input;
