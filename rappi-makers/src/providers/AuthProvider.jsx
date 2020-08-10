import React, { Component, createContext } from 'react';
import { login } from '../services/Auth';

export const UserAuthContext = createContext({});

class UserAuthProvider extends Component {
  state = {
    token: null,
    user: null,
    logged: false,
    error: null,
    login: null,
    loading: false,
    open: false,
    message: '',
    title: '',
  };

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    const login = localStorage.getItem('login');
    const balance = localStorage.getItem('balance');
    if (token && user) {
      this.setState({
        token: token,
        user: user,
        logged: true,
        login: login,
        balance: balance,
      });
    }
  };
  formSubmit = async ({ email, password }) => {
    this.setState({ loading: true });
    const response = await login(email, password);
    const { data, error } = response;
    if (!error) {
      const login = Object.keys(data)[1] === 'user' ? 'user' : 'restaurant';
      this.setState(
        () => {
          return {
            token: data.token,
            user: login === 'user' ? data.user : data.restaurant,
            balance: login === 'user' ? data.user.balance : data.restaurant.balance,
            logged: true,
            login,
          };
        },
        () => {
          localStorage.setItem('token', this.state.token);
          localStorage.setItem('user', JSON.stringify(this.state.user));
          localStorage.setItem('login', login);
          localStorage.setItem('balance', this.state.balance);
        }
      );
    } else {
      const { message } = response;
      this.setState({
        open: true,
        title: 'Ha ocurrido un problema',
        message,
      });
    }
    this.setState({ loading: false });
  };

  updateTokenBalance = (newToken, newBalance) => {
    this.setState({
      token: newToken,
      balance: newBalance,
    });
  };

  logout = () => {
    this.setState({
      token: null,
      user: null,
      logged: false,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('login');
    localStorage.removeItem('balance');
  };

  onClose = () => {
    this.setState({
      open: false,
      title: '',
      message: '',
    });
  };

  render() {
    const { user, token, logged, login, balance, loading, open, title, message } = this.state;
    const { children } = this.props;
    const formSubmit = this.formSubmit;
    const logout = this.logout;
    const updateTokenBalance = this.updateTokenBalance;
    const onClose = this.onClose;
    return (
      <UserAuthContext.Provider
        value={{
          formSubmit,
          logout,
          updateTokenBalance,
          onClose,
          user,
          token,
          logged,
          login,
          balance,
          loading,
          open,
          title,
          message,
        }}
      >
        {children}
      </UserAuthContext.Provider>
    );
  }
}

export default UserAuthProvider;
