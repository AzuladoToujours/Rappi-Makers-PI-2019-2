import React, { useContext, useEffect } from 'react';
import Vacancy from '../Vacancy/vacancy';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import VacancyFilter from '../VacancyFilter/vacancyFilter';
import { VacancyContext } from '../../providers/VacancyProvider';
import { UserAuthContext } from '../../providers/AuthProvider';
import { VacancyFormContext } from '../../providers/VacancyFormProvider';
import { formatDate, getPositionName, formatPayment } from '../../utils/utils';
import './vacancies.css';

const Vacancies = () => {
  const {
    filteredVacancies,
    updateFilter,
    getVacancies,
    addCandidate,
    removeCandidate,
    loading,
    open,
    title,
    message,
    onClose,
  } = useContext(VacancyContext);
  const { token } = useContext(UserAuthContext);
  const { deleteVacancy } = useContext(VacancyFormContext);

  useEffect(() => {
    getVacancies();
  }, [getVacancies]);

  return (
    <>
      <div className="filter-container">
        <h1>Ofertas</h1>
        <VacancyFilter updateFilter={updateFilter} />
      </div>
      <div className="vacancies-container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {filteredVacancies.map((vacancy) => {
              return (
                <Vacancy
                  key={vacancy.id}
                  vacancy={vacancy}
                  formatPayment={formatPayment}
                  formatDate={formatDate}
                  addCandidate={addCandidate}
                  removeCandidate={removeCandidate}
                  deleteVacancy={deleteVacancy}
                  token={token}
                  getPositionName={getPositionName}
                />
              );
            })}
          </>
        )}
        <Message open={open} messageTitle={title} messageBody={message} onClose={onClose} />
      </div>
    </>
  );
};

export default Vacancies;
