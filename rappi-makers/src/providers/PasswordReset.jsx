import React, { useCallback, useState, createContext } from 'react';
import { forgotPassword } from '../services/Auth';

export const PasswordResetContext = createContext({});

const PasswordReset = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const formSubmit = useCallback(async ({ email }) => {
    setLoading(true);
    const response = await forgotPassword(email);
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
  };

  return (
    <PasswordResetContext.Provider value={{ formSubmit, onClose, open, title, message, loading }}>
      {children}
    </PasswordResetContext.Provider>
  );
};

export default PasswordReset;
