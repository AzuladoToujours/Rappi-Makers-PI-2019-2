import React, { useContext } from 'react';
import { UserAuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import home from '../../img/home.svg';
import homeuser from '../../img/homeuser.svg';

const HomeAuth = ({ login }) => {
  const { user } = useContext(UserAuthContext);
  return (
    <>
      {login === 'user' ? (
        <div className="home-auth-container">
          <div className="home-auth-tex">
            <h1 className="brand">Bienvenido {user.names}</h1>
            <p>Busca la oferta perfecta para ti</p>
          </div>
          <div className="home-auth-img-container">
            <img src={homeuser} alt="home" className="homeauth-img" />
          </div>
          <div className="home-link-container">
            <Link to="/vacancies" className="home-link">
              Ofertas
            </Link>
          </div>
        </div>
      ) : (
        <div className="home-auth-container">
          <div className="home-auth-text">
            <h1 className="brand">Bienvenido {user.name}</h1>
            <p>Crea una oferta y encuentra el empleado perfecto para ti</p>
          </div>
          <div className="home-auth-img-container">
            <img src={home} alt="home" className="homeauth-img" />
          </div>
          <div className="home-link-container">
            <Link to="/newVacancy" className="home-link">
              Crear oferta
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeAuth;
