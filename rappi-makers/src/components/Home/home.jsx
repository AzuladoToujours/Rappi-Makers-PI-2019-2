import React, { useContext } from 'react';
import HomeAuth from './homeAuth';
import { UserAuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import contract from '../../img/contract.svg';
import restaurant from '../../img/restaurant.svg';
import './home.css';

const Home = () => {
  const { logged, login } = useContext(UserAuthContext);
  return (
    <div className="home-container">
      {logged ? (
        <HomeAuth login={login} />
      ) : (
        <section>
          <div className="brand-container">
            <h1 className="brand">Bienvenido a Rappi Makers</h1>
            <p>Encuentra el empleado perfecto para el trabajo perfecto</p>
            <p>Registrate con nosotros</p>
          </div>
          <div className="work-container">
            <div className="restaurant-container card">
              <h3>Soy restaurante</h3>
              <Link to="/restaurantsignup">
                <img src={restaurant} className="home-img" alt="Restaurante" />
              </Link>
            </div>
            <div className="contract-container card">
              <h3>Busco trabajo</h3>
              <Link to="/usersignup">
                <img src={contract} className="home-img" alt="Contrato" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
