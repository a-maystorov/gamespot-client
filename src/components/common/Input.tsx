import React from 'react';

interface InputProps {
  name: string;
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
}

function Input({ label, name, type, onChange, value }: InputProps) {
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
    </div>
  );
}

export default Input;
