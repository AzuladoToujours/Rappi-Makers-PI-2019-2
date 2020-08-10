import React, { useContext } from 'react';
import Form from '../Form/Form';
import Welcome from '../Welcome/Welcome';
import withForm from '../../HOC/withForm';
import { RestaurantSignUpContext } from '../../providers/RestauarantSignUp';
import formConfig from './FormValidation';
import { inputProps } from './InputProps';

const RestaurantSignUp = withForm(
  (props) => {
    const { handleSubmit, values } = props;
    const { open, loading, error, errorMessage, onClose } = useContext(RestaurantSignUpContext);
    return (
      <>
        <Form
          title="Registrate en Rappi Makers"
          handleSubmit={handleSubmit}
          inputProps={inputProps}
          btnText="Registrarse"
          loading={loading}
          values={values}
        />
        <Welcome open={open} error={error} errorMessage={errorMessage} onClose={onClose} />
      </>
    );
  },
  formConfig,
  RestaurantSignUpContext
);

export default RestaurantSignUp;
