import React, { useCallback, useContext, useState, createContext } from 'react';
import { UserAuthContext } from './AuthProvider';
import { SignUp, EditUser } from '../services/User';

export const UserSignUpContext = createContext({});

const UserSignUpProvider = ({ children }) => {
  const { token } = useContext(UserAuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const formSubmit = useCallback(async (values) => {
    setLoading(true);
    const response = await SignUp(values);
    const { error } = response;
    if (!error) {
      setOpen(true);
    } else {
      const { message } = response;
      setOpen(true);
      setError(true);
      setErrorMessage(message);
    }
    setLoading(false);
  }, []);

  const editUser = async (values) => {
    setLoading(true);
    const response = await EditUser(values, token);
    const { error } = response;
    if (!error) {
      displayMessage('Información editada', 'Se ha editado con exito la información de usuario', true);
    } else {
      const { message } = response;
      displayMessage('Ha ocurrido un error', message, true);
    }
    setLoading(false);
  };
  const displayMessage = (message, title, open) => {
    setTitle(message);
    setMessage(title);
    setOpen(open);
  };
  const onClose = () => {
    setOpen(false);
    setError(false);
    setErrorMessage('');
  };

  return (
    <UserSignUpContext.Provider
      value={{ formSubmit, editUser, onClose, open, error, errorMessage, message, title, loading }}
    >
      {children}
    </UserSignUpContext.Provider>
  );
};

export default UserSignUpProvider;
