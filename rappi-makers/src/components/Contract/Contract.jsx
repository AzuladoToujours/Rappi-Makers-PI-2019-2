import React from 'react';
import { Link } from 'react-router-dom';
import './Contract.css';

const Contract = ({ contract, formatDate }) => {
  return (
    <div className="contract-card">
      <div className="contract-header">
        <h2>{contract.description}</h2>
      </div>
      <div className="contract-body">
        <h3>Fecha de creación</h3>
        <p>{formatDate(contract.created_at)}</p>
        <h3>Fecha de inicio</h3>
        <p>{formatDate(contract.start_at)}</p>
        <h3>Fecha de finalización</h3>
        <p>{formatDate(contract.end_at)}</p>
        <div className="link-container">
          <Link to={`/contrac/${contract.id}`}>Ver detalles</Link>
        </div>
      </div>
    </div>
  );
};

export default Contract;
