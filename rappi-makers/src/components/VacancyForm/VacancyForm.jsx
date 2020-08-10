import React, { useContext } from 'react';
import Message from '../Message/Message';
import withForm from '../../HOC/withForm';
import Form from '../Form/Form';
import formConfig from './formValidation';
import { inputProps } from './InputProps';
import { VacancyFormContext } from '../../providers/VacancyFormProvider';

const VacancyForm = withForm(
  ({ handleSubmit, values }) => {
    const { loading, open, message, title, onClose } = useContext(VacancyFormContext);
    return (
      <>
        <Form
          title="Crea una oferta en Rappi Makers"
          handleSubmit={handleSubmit}
          inputProps={inputProps}
          btnText="Crear oferta"
          loading={loading}
          isPosition={true}
          values={values}
        />
        <Message open={open} messageTitle={title} messageBody={message} onClose={onClose} />
      </>
    );
  },
  formConfig,
  VacancyFormContext
);

export default VacancyForm;
