import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserSignUpContext } from '../../providers/UserSignUp';
import { Formik } from 'formik';
import { formValidation } from './formValidations';
import EditForm from '../EditForm/EditForm';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';
import { getUserById } from '../../endpoints/UserEndpoints';
import { inputProps } from './inputProps';

const EditUserForm = () => {
  const { userId } = useParams();
  const [loadedVacancy, setloadedVacancy] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const { editUser, open, title, message, onClose, loading } = useContext(UserSignUpContext);

  const fethVacancyData = useCallback(async () => {
    const endpoint = `${getUserById}/${userId}`;
    try {
      const { data } = await axios.get(endpoint);
      setFormValues({
        names: data.names,
        last_names: data.last_names,
        mobile: data.mobile,
        country: '',
        state: '',
        city: '',
        address: data.address,
        description: data.description,
      });
    } catch (error) {
      displayMessage('Hubo un problema obteniendo la información', 'Lo sentimos', true);
    } finally {
      setloadedVacancy(true);
    }
  }, [userId]);
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
        <Formik initialValues={formValues} onSubmit={editUser} validationSchema={formValidation}>
          {(props) => (
            <EditForm
              {...props}
              editId={userId}
              loading={loading}
              open={open}
              message={message}
              title={title}
              onClose={onClose}
              inputProps={inputProps}
              isVacancy={false}
              isLocation={true}
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

export default EditUserForm;
