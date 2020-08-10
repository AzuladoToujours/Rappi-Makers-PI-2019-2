import React from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';
import './Position.css';
const Position = ({ values }) => {
  return (
    <>
      Habilidades
      <FieldArray
        name="positions"
        render={(arrayHelpers) => {
          return (
            <div>
              {values.positions.map((position, index) => (
                <div key={index}>
                  <Field as="select" name={`positions.${index}`} className="signup-select">
                    <option value="">Seleccione una habilidad</option>
                    <option value="cocinero">Cocinero</option>
                    <option value="mesero">Mesero</option>
                    <option value="lavaplatos">Lava platos</option>
                  </Field>
                  <div className="error-message">
                    <ErrorMessage name={`positions.${index}`} />
                  </div>
                </div>
              ))}
              <div className="positions-actions-container">
                {values.positions.length > 1 && (
                  <div className="position-icon" onClick={() => arrayHelpers.pop()}>
                    <img src="https://img.icons8.com/material-outlined/24/000000/filled-trash.png" alt="" />
                  </div>
                )}
                {values.positions.length < 3 && (
                  <div className="position-icon" onClick={() => arrayHelpers.push('')}>
                    <img src="https://img.icons8.com/material/24/000000/plus-2-math--v1.png" alt="" />
                  </div>
                )}
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export default Position;
