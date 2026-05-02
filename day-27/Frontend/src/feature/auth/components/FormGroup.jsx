import React from "react";

const FormGroup = ({ label, placeholder, value, onChange ,type }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label><input
        value={value}
        onChange={onChange}
        type={type}
        placeholder="Enter email"
        id="email"
        name="email"
        required
      />
    </div>
  );
};

export default FormGroup;
