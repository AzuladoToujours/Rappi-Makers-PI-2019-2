import React, { useContext } from 'react';
import { object, string } from 'yup';
import { useParams } from 'react-router-dom';
import { PasswordChangeContext } from '../../providers/PasswordChange';
import Form from '../Form/Form';
import Message from '../Message/Message';
import withForm from '../../HOC/withForm';

const formConfig = {
  formValues: {
    password: '',
  },
  formValidation: object({
    password: string()
      .matches(
        new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
        'La contraseña debe contener al menos un número y un caracter en mayuscula'
      )
      .min(6, 'La contraseña debe ser mínimo de 6 caracteres'),
  }),
};
const inputProps = [
  {
    name: 'password',
    type: 'password',
    label: 'Contraseña',
    placeholder: 'Debe contener al menos un número y una mayuscula',
  },
];

const PasswordChange = withForm(
  (props) => {
    const { token } = useParams();
    const { handleSubmit, values } = props;
    const { onClose, open, title, message, loading } = useContext(PasswordChangeContext);
    return (
      <>
        <Form
          title="Recuperar contraseña"
          handleSubmit={(event) => {
            event.preventDefault();
            values.token = token;
            handleSubmit(values);
          }}
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
  PasswordChangeContext
);

export default PasswordChange;
