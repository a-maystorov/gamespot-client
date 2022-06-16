import React from 'react';

interface InputProps {
  name: string;
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, name, type, onChange }: InputProps) {
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
      />
    </div>
  );
}

export default Input;
