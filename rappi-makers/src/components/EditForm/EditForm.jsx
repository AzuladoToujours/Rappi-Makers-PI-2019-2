import React from 'react';
import Button from '../Button/Button';
import FormInputs from '../FormInputs/FormInputs';
import Location from '../Location/Location';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import VacancyPosition from '../VacancyPosition/VacancyPosition';

const EditForm = (props) => {
  const {
    handleSubmit,
    values,
    loading,
    editId,
    open,
    title,
    message,
    onClose,
    isVacancy,
    inputProps,
    isLocation,
  } = props;
  values.editId = editId;
  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Editar oferta</h2>
        <form onSubmit={handleSubmit} className="singup-form">
          <FormInputs inputProps={inputProps} identifier="signup-input" />
          {isVacancy && <VacancyPosition />}
          {isLocation && <Location country={values.country} state={values.state} />}
          {loading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : (
            <Button type="submit" className="signup-btn" text="Editar" />
          )}
        </form>
      </div>
      <Message open={open} messageTitle={title} messageBody={message} onClose={onClose} />
    </div>
  );
};

export default EditForm;
