import React, { useContext } from 'react';
import { object, string } from 'yup';
import { PasswordResetContext } from '../../providers/PasswordReset';
import Form from '../Form/Form';
import Message from '../Message/Message';
import withForm from '../../HOC/withForm';

const formConfig = {
  formValues: {
    email: '',
  },
  formValidation: object({
    email: string().email('Formato de email erroneo').required('Este campo es obligatorio'),
  }),
};
const inputProps = [
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'example@example.com',
  },
];

const PasswordReset = withForm(
  (props) => {
    const { handleSubmit } = props;
    const { onClose, open, title, message, loading } = useContext(PasswordResetContext);
    return (
      <>
        <Form
          title="Recuperar contraseña"
          handleSubmit={handleSubmit}
          btnText="Recuperar"
          inputProps={inputProps}
          loading={loading}
          isLogin={true}
        />
        <Message open={open} messageTitle={title} messageBody={message} onClose={onClose} />
      </>
    );
  },
  formConfig,
  PasswordResetContext
);

export default PasswordReset;
