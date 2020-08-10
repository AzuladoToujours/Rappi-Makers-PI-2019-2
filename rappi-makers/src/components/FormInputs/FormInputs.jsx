import React from 'react';
import Input from '../Input/Input';

const FormInputs = ({ inputProps, identifier }) => (
  <>
    {inputProps.map((input, index) => (
      <Input
        key={index}
        name={input.name}
        type={input.type}
        label={input.label}
        identifier={identifier}
        placeholder={input.placeholder}
      />
    ))}
  </>
);

export default FormInputs;
