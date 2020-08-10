import React, { useContext, useState, createContext } from 'react';
import { UserAuthContext } from './AuthProvider';
import { CreateVacancy, EditVacancy, DeleteVacancy } from '../services/Vacancy';

export const VacancyFormContext = createContext({
  formSubmit: function () {},
  deleteVacancy: function () {},
  loading: false,
});

const VacancyFormProvider = ({ children }) => {
  const { token, updateTokenBalance } = useContext(UserAuthContext);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const formSubmit = async (values) => {
    setLoading(true);
    const response = await CreateVacancy(values, token);
    const { error } = response;
    if (!error) {
      const { data } = response;
      updateTokenBalance(data.token, data.balance);
      displayMessage(
        'Oferta creada',
        'Pudes observar los detalles de la oferta en la sección de ofertas',
        true
      );
    } else {
      const { message } = response;
      displayMessage('Ha ocurrido un error', message, true);
    }
    setLoading(false);
  };

  const editVacancy = async (values) => {
    setLoading(true);
    const response = await EditVacancy(values, token);
    const { error } = response;
    if (!error) {
      displayMessage('Oferta editada', 'Se ha editado con exito la oferta', true);
    } else {
      const { message } = response;
      displayMessage('Ha ocurrido un error', message, true);
    }
    setLoading(false);
  };

  const deleteVacancy = async (vacancyId) => {
    const response = await DeleteVacancy(vacancyId, token);
    const { error } = response;
    if (!error) {
      displayMessage('Oferta eliminada', 'Se ha eliminado con exito la oferta', true);
    } else {
      displayMessage('Lo sentimos', error.response.data.error, true);
    }
  };

  const displayMessage = (message, title, open) => {
    setTitle(message);
    setMessage(title);
    setOpen(open);
  };

  const onClose = () => {
    setTitle('');
    setMessage('');
    setOpen(false);
  };

  return (
    <VacancyFormContext.Provider
      value={{ formSubmit, editVacancy, deleteVacancy, title, message, open, onClose, loading }}
    >
      {children}
    </VacancyFormContext.Provider>
  );
};

export default VacancyFormProvider;
