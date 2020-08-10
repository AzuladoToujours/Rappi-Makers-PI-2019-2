import React, { useCallback, useState, createContext } from 'react';
import { changePassword } from '../services/Auth';
import { useHistory } from 'react-router-dom';

export const PasswordChangeContext = createContext({});

const PasswordChange = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const formSubmit = useCallback(async ({ password, token }) => {
    setLoading(true);
    const response = await changePassword(password, token);
    const { error } = response;
    if (!error) {
      const { data } = response;
      setOpen(true);
      setTitle('Recuperación de contraseña');
      setMessage(data.message);
    } else {
      const { message } = response;
      setOpen(true);
      setTitle('Ha ocurrido un problema');
      setMessage(message);
    }
    setLoading(false);
  }, []);

  const onClose = () => {
    setTitle('');
    setMessage('');
    setOpen(false);
    history.push('/signin');
  };

  return (
    <PasswordChangeContext.Provider value={{ formSubmit, onClose, open, title, message, loading }}>
      {children}
    </PasswordChangeContext.Provider>
  );
};

export default PasswordChange;
