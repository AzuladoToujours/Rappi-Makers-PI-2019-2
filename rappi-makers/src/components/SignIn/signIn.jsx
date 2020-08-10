import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Form from '../Form/Form';
import Message from '../Message/Message';
import withForm from '../../HOC/withForm';
import { formConfig } from './FormValidation';
import { UserAuthContext } from '../../providers/AuthProvider';
import { inputProps } from './InputProps';
import './signIn.css';

const SignIn = withForm(
  ({ handleSubmit }) => {
    const { logged, loading, open, title, message, onClose } = useContext(UserAuthContext);
    return (
      <>
        {logged ? (
          <Redirect to="/" />
        ) : (
          <>
            <Form
              title="Iniciar sesión en Rappi Makers"
              handleSubmit={handleSubmit}
              btnText="Iniciar sesión"
              inputProps={inputProps}
              loading={loading}
              isLogin={true}
              forgotPassword={true}
            />
            <Message open={open} messageTitle={title} messageBody={message} onClose={onClose} />
          </>
        )}
      </>
    );
  },
  formConfig,
  UserAuthContext
);

export default SignIn;
