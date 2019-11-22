import React from "react";

export const Input = ({ onChange, name, placeholder, required, value }) => (
  <div className="input">
    <input
      value={value}
      name={name}
      required={required}
      onChange={e => onChange(e)}
      autoComplete="off"
    />
    <label htmlFor={name}>
      <span>{placeholder}</span>
    </label>
  </div>
);