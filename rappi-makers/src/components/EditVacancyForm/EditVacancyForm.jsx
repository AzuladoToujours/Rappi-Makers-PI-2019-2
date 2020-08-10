import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { VacancyFormContext } from '../../providers/VacancyFormProvider';
import { Formik } from 'formik';
import { formValidation } from './formValidations';
import EditForm from '../EditForm/EditForm';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';
import { getVacancyById } from '../../endpoints/VacancyEndpoints';
import { inputProps } from '../VacancyForm/InputProps';
import './EditForm.css';

const EditVacancyForm = () => {
  const { vacancyId } = useParams();
  const [loadedVacancy, setloadedVacancy] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const { editVacancy, open, title, message, onClose, loading } = useContext(VacancyFormContext);

  const fethVacancyData = useCallback(async () => {
    const endpoint = `${getVacancyById}/${vacancyId}`;
    try {
      const { data } = await axios.get(endpoint);
      setFormValues({
        description: data.description,
        start_at: data.start_at,
        start_hour: '',
        end_at: data.end_at,
        end_hour: '',
        offers_quantity: data.offers_quantity,
        payment_per_hour: data.payment_per_hour,
        country: data.country,
        state: data.state,
        city: data.city,
        address: data.address,
        position: '',
      });
    } catch (error) {
      displayMessage('Hubo un problema obteniendo la información', 'Lo sentimos', true);
    } finally {
      setloadedVacancy(true);
    }
  }, [vacancyId]);
  useEffect(() => {
    fethVacancyData();
  }, [fethVacancyData]);

  const displayMessage = (message, title, open) => {
    setErrorMessage(message);
    setErrorTitle(title);
    setOpenError(open);
  };
  const onErrorClose = () => {
    setErrorMessage('');
    setErrorTitle('');
    setOpenError(false);
  };

  return (
    <>
      {loadedVacancy ? (
        <Formik initialValues={formValues} onSubmit={editVacancy} validationSchema={formValidation}>
          {(props) => (
            <EditForm
              {...props}
              editId={vacancyId}
              loading={loading}
              open={open}
              message={message}
              title={title}
              onClose={onClose}
              isVacancy={true}
              inputProps={inputProps}
            />
          )}
        </Formik>
      ) : (
        <div className="edit-loading">
          <Spinner />
        </div>
      )}
      <Message open={openError} messageTitle={errorTitle} messageBody={errorMessage} onClose={onErrorClose} />
    </>
  );
};

export default EditVacancyForm;
