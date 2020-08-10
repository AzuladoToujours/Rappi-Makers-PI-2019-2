import React, { useContext } from 'react';
import { UserAuthContext } from '../../providers/AuthProvider';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import VacancyStatus from '../VacancyStatus/VacancyStatus';
import { Link } from 'react-router-dom';
import './VacancyAuth.css';

const VacancyAuth = ({ addCandidate, removeCandidate, deleteVacancy, vacancy, candidateLoading, status }) => {
  const { user, token, logged, login } = useContext(UserAuthContext);

  const checkCandidate = (candidateId) => {
    return vacancy.candidates.includes(candidateId);
  };
  return (
    <div>
      {logged && (
        <>
          {status === 'CLOSED' ? (
            <VacancyStatus />
          ) : (
            <>
              {login === 'user' ? (
                <>
                  {checkCandidate(user.id) ? (
                    <>
                      {candidateLoading ? (
                        <div className="vacancy-spinner">
                          <Spinner />
                        </div>
                      ) : (
                        <Button text="Remover" handleClick={() => removeCandidate(vacancy.id, token)} />
                      )}
                    </>
                  ) : (
                    <>
                      {candidateLoading ? (
                        <div className="vacancy-spinner">
                          <Spinner />
                        </div>
                      ) : (
                        <Button
                          className="vacancy-btn"
                          handleClick={() => addCandidate(vacancy.id, token)}
                          text="Postularse"
                          type="button"
                        />
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {user.id === vacancy.restaurant_id && (
                    <div className="vacancy-links-container">
                      <Link to={`/candidates/${vacancy.id}`} className="vacancy-links">
                        Ver candidatos
                      </Link>
                      <Link to={`/editVacancy/${vacancy.id}`} className="vacancy-links">
                        Editar
                      </Link>
                      <Link
                        to={`/vacancies`}
                        onClick={() => deleteVacancy(vacancy.id, token)}
                        className="vacancy-links"
                      >
                        Eliminar
                      </Link>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VacancyAuth;
