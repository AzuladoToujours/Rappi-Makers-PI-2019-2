import React from 'react';
import './VacancyDetail.css';
const VacancyDetail = ({ vacancy, formatPayment, formatDate }) => {
  return (
    <>
      <h2>Detalle de la vacante</h2>
      <div className="vacancy-detail">
        <div className="vacancy-detail-description-container">
          <h2>Descripción</h2>
          <p>{vacancy.description}</p>
        </div>
        <div className="vacancy-detail-info-container">
          <div className="vacancy-data">
            <h4>Cantidad de vacantes</h4>
            <p>{vacancy.offers_quantity}</p>
          </div>
          <div className="vacancy-data">
            <h4>Pago por hora</h4>
            <p>${formatPayment(vacancy.payment_per_hour)} COP</p>
          </div>
          <div className="vacancy-data">
            <h4>País</h4>
            <p>{vacancy.country} </p>
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
        </div>
      </div>
    </>
  );
};

export default VacancyDetail;
