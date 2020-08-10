import React, { useContext } from 'react';
import { VacancyContext } from '../../providers/VacancyProvider';
import './vacancy.css';
import VacancyAuth from '../VacancyAuth/VacancyAuth';

const Vacancy = ({
  vacancy,
  formatPayment,
  formatDate,
  addCandidate,
  removeCandidate,
  deleteVacancy,
  getPositionName,
}) => {
  const { candidateLoading } = useContext(VacancyContext);
  return (
    <div className="vacancy-card">
      <div className="vacancy-card-container">
        <div className="vacancy-card-description">
          <h2 className="vacancy-description">{vacancy.description}</h2>
        </div>
        <div className="vacany-card-body">
          <div className="vacancy-info">
            <div className="vacancy-data">
              <h4>Cantidad de vacantes</h4>
              <p>{vacancy.offers_quantity}</p>
            </div>
            <div className="vacancy-data">
              <h4>Pago por hora</h4>
              <p>${formatPayment(vacancy.payment_per_hour)} COP</p>
            </div>
            <div className="vacancy-data">
              <h4>Estado</h4>
              <p>{vacancy.state} </p>
            </div>
            <div className="vacancy-data">
              <h4>Ciudad</h4>
              <p>{vacancy.city} </p>
            </div>
            <div className="vacancy-data">
              <h4>Dirreción</h4>
              <p>{vacancy.address} </p>
            </div>
            <div className="vacancy-data">
              <h4>Fecha de inicio</h4>
              <p>{formatDate(vacancy.start_at)}</p>
            </div>
            <div className="vacancy-data">
              <h4>Fecha final</h4>
              <p>{formatDate(vacancy.end_at)}</p>
            </div>
            <div className="vacancy-data">
              <h4>Habilidad requerida</h4>
              <p>{getPositionName(vacancy.position_id)}</p>
            </div>
          </div>
          <div className="vacancy-card-actions">
            <VacancyAuth
              vacancy={vacancy}
              addCandidate={addCandidate}
              removeCandidate={removeCandidate}
              deleteVacancy={deleteVacancy}
              candidateLoading={candidateLoading}
              status={vacancy.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacancy;
