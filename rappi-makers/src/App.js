import React from 'react';

import CandidatesList from './components/CandidatesList/CandidatesList';
import ContracDetails from './components/ContractDetails/ContractDetails';
import ContractList from './components/ContractList/ContracList';
import EditUser from './components/EditUserForm/EditUserForm';
import EditRestaurant from './components/EditRestaurantForm/EditRestaurant';
import EditVacancyForm from './components/EditVacancyForm/EditVacancyForm';
import Home from './components/Home/home';
import Navbar from './components/navbar/navbar';
import PasswordChange from './components/PasswordChange/PasswordChange';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Profile from './components/Profile/Profile';
import RestaurantSignUp from './components/RestaurantSignUpForm/RestaurantSignUp';
import SignIn from './components/SignIn/signIn';
import UserSignUp from './components/UserSignUpForm/UserSignUp';
import Vacancies from './components/Vacancies/vacancies';
import VacancyDetailProvider from './containers/VacancyDetails/VacancyDetail';
import VacancyForm from './components/VacancyForm/VacancyForm';

import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/vacancies">
          <Vacancies />
        </Route>
        <Route path="/vacancy/:id">
          <VacancyDetailProvider />
        </Route>
        <Route path="/usersignup">
          <UserSignUp />
        </Route>
        <Route path="/restaurantsignup">
          <RestaurantSignUp />
        </Route>
        <Route path="/newVacancy">
          <VacancyForm />
        </Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
        <Route path="/candidates/:vacancyId">
          <CandidatesList />
        </Route>
        <Route path="/editVacancy/:vacancyId">
          <EditVacancyForm />
        </Route>
        <Route path="/editUser/:userId">
          <EditUser />
        </Route>
        <Route path="/editRestaurant/:restaurantId">
          <EditRestaurant />
        </Route>
        <Route path="/contracts">
          <ContractList />
        </Route>
        <Route path="/contrac/:contractId">
          <ContracDetails />
        </Route>
        <Route path="/forgotPassword">
          <PasswordReset />
        </Route>
        <Route path="/reset-password/:token">
          <PasswordChange />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
