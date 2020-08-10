import React from 'react';
import { Field, ErrorMessage } from 'formik';
import './Input.css';
const Input = ({ name, type, label, identifier, placeholder }) => (
  <>
    <label>
      {label}(<span className="span-required">*</span>)
      <Field type={type} name={name} placeholder={placeholder} className={identifier} />
    </label>
    <div className="error-message">
      <ErrorMessage name={name} />
    </div>
  </>
);

export default Input;
