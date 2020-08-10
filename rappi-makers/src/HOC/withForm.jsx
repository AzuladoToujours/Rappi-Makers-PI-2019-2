import React, { useContext } from 'react';
import { Formik } from 'formik';

function withForm(WrappedForm, formConfig, context) {
  return function () {
    const { formValues, formValidation } = formConfig;
    const { formSubmit } = useContext(context);
    return (
      <Formik initialValues={formValues} onSubmit={formSubmit} validationSchema={formValidation}>
        {(props) => <WrappedForm {...props} />}
      </Formik>
    );
  };
}

export default withForm;
