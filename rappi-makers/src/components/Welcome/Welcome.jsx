import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './Welcome.css';

const Welcome = ({ open, error, errorMessage, onClose }) => {
  return (
    <Popup open={open} onClose={onClose}>
      {error ? (
        <div className="welcome-container">
          <h2 className="welcome-title">Error en el regsitro</h2>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="welcome-container">
          <h2 className="welcome-title">Bienvenido a Rappi Makers</h2>
          <p>Inicia sesión y empieza a disfrutar de todos los beneficios que tenemos para ti</p>
          <Link to="/signin" className="welcome-link" onClick={() => onClose()}>
            Iniciar sesión
          </Link>
        </div>
      )}
    </Popup>
  );
};

export default Welcome;
