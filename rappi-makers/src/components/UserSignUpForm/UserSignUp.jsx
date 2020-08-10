import React, { useContext } from 'react';
import withForm from '../../HOC/withForm';
import { UserSignUpContext } from '../../providers/UserSignUp';
import Form from '../Form/Form';
import Welcome from '../Welcome/Welcome';
import formConfig from './FormValidation';
import { inputProps } from './InputProps';

const UserSignUp = withForm(
  (props) => {
    const { handleSubmit, values } = props;
    const { open, loading, error, errorMessage, onClose } = useContext(UserSignUpContext);
    return (
      <>
        <Form
          title="Registrate en Rappi Makers"
          handleSubmit={handleSubmit}
          btnText="Registrarse"
          inputProps={inputProps}
          values={values}
          loading={loading}
          userPosition={true}
        />
        <Welcome open={open} error={error} errorMessage={errorMessage} onClose={onClose} />
      </>
    );
  },
  formConfig,
  UserSignUpContext
);

export default UserSignUp;
