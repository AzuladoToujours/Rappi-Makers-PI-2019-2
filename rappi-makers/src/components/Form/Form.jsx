import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import FormInputs from '../FormInputs/FormInputs';
import Location from '../Location/Location';
import Position from '../Position/Position';
import Spinner from '../Spinner/Spinner';
import VacancyPosition from '../VacancyPosition/VacancyPosition';
import './Form.css';

const Form = ({
  title,
  handleSubmit,
  inputProps,
  btnText,
  loading,
  values,
  isPosition,
  isLogin,
  userPosition,
  forgotPassword,
}) => {
  return (
    <div className="form-container">
      <div className="form-card">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit} className="singup-form">
          <FormInputs inputProps={inputProps} identifier="signup-input" />
          {!isLogin && <Location country={values.country} state={values.state} />}
          {userPosition && <Position values={values} />}
          {isPosition && <VacancyPosition />}
          {forgotPassword && (
            <Link to="/forgotPassword" className="forgot-link">
              ¿Olvide la contraseña?
            </Link>
          )}
          {loading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : (
            <Button type="submit" className="signup-btn" text={btnText} />
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
