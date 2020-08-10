import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { RestaurantSignUpContext } from '../../providers/RestauarantSignUp';
import { Formik } from 'formik';
import { formValidation } from './formValidations.js';
import EditForm from '../EditForm/EditForm';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';
import { getRestaurantById } from '../../endpoints/RestaurantEndpoints';
import { inputProps } from './inputProps';

const EditRestaurant = () => {
  const { restaurantId } = useParams();
  const [loadedVacancy, setloadedVacancy] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const { editRestaurant, open, title, message, onClose, loading } = useContext(RestaurantSignUpContext);

  const fethVacancyData = useCallback(async () => {
    const endpoint = `${getRestaurantById}/${restaurantId}`;
    try {
      const { data } = await axios.get(endpoint);
      setFormValues({
        name: data.name,
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
  }, [restaurantId]);
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
        <Formik initialValues={formValues} onSubmit={editRestaurant} validationSchema={formValidation}>
          {(props) => (
            <EditForm
              {...props}
              editId={restaurantId}
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

export default EditRestaurant;
