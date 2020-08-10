import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserAuthContext } from '../../providers/AuthProvider';

const NavbarAuth = () => {
  const activeLink = { color: 'rgb(143, 143, 143)' };
  const { user, logout, login } = useContext(UserAuthContext);
  return (
    <>
      {user ? (
        <>
          <li>
            <NavLink to="/contracts" className="navbar-link" activeStyle={activeLink}>
              Contratos
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profile/${user.id}`} className="navbar-link" activeStyle={activeLink}>
              {login === 'user' ? user.names : user.name}
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="navbar-link" activeStyle={activeLink} onClick={logout}>
              Cerrar sesión
            </NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/signin" className="navbar-link" activeStyle={activeLink}>
            Iniciar sesión
          </NavLink>
        </li>
      )}
    </>
  );
};

export default NavbarAuth;
