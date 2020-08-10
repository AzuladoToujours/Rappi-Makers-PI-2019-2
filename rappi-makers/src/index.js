import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VacancyProvider from './providers/VacancyProvider';
import UserAuthProvider from './providers/AuthProvider';
import VacancyFormProvider from './providers/VacancyFormProvider';
import UserSignUpProvider from './providers/UserSignUp';
import RestaurantSignUpProvider from './providers/RestauarantSignUp';
import PasswordReset from './providers/PasswordReset';
import PasswordChange from './providers/PasswordChange';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserAuthProvider>
        <VacancyFormProvider>
          <VacancyProvider>
            <UserSignUpProvider>
              <RestaurantSignUpProvider>
                <PasswordReset>
                  <PasswordChange>
                    <App />
                  </PasswordChange>
                </PasswordReset>
              </RestaurantSignUpProvider>
            </UserSignUpProvider>
          </VacancyProvider>
        </VacancyFormProvider>
      </UserAuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
