import React from 'react';
import { NavLink } from 'react-router-dom';
import NavbarAuth from './navAuth';
import './navbar.css';
import rappi_logo from '../../img/rappi_logo.png';

//https://codepen.io/mhrkit/pen/GGqdvr { navSlide, activeLink }
const Navbar = () => {
  const activeLink = { color: 'rgb(143, 143, 143)' };
  const navSlide = () => {
    const navList = document.querySelector('.navbar-list');
    const burger = document.querySelector('.burger-menu');
    navList.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-link" activeStyle={activeLink} exact>
          <img src={rappi_logo} alt="Rappi logo" className="rappi-logo" />
        </NavLink>
      </div>
      <ul className="navbar-list">
        <li>
          <NavLink to="/" className="navbar-link" activeStyle={activeLink} exact>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/vacancies" className="navbar-link" activeStyle={activeLink}>
            Ofertas
          </NavLink>
        </li>

        <NavbarAuth />
      </ul>
      <div className="burger-menu" onClick={() => navSlide()}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
