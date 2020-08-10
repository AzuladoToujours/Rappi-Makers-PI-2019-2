import React from 'react';
import { Field } from 'formik';

const VacancyPosition = () => {
  return (
    <>
      Habilidad requerida
      <Field as="select" name="position" className="signup-select">
        <option value="">Seleccione una habilidad</option>
        <option value="cocinero">Cocinero</option>
        <option value="mesero">Mesero</option>
        <option value="lavaplatos">Lava platos</option>
      </Field>
    </>
  );
};

export default VacancyPosition;
