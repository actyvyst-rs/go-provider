import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { AuthAPI } from '../modules/APIWrapper';

export const AppContext = React.createContext();

export class AppContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      refreshToken: ''
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    this.setState({ accessToken, refreshToken });
  }

  setTokens = (accessToken, refreshToken) => {
    this.setState({ accessToken, refreshToken });
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  login = async (email, password) => {
    try {
      let tokens = await AuthAPI.login(email, password);
      this.setTokens(tokens.token, tokens.refreshToken);
      console.log('login successful');
    } catch (err) {
      throw new Error(err);
    }
  };

  logout = () => {
    this.setTokens('', '');
  };

  render() {
    const { children } = this.props;
    let user = {};
    let loggedIn = false;
    try {
      user = jwtDecode(this.state.accessToken);
      loggedIn = true;
    } catch (err) {
      loggedIn = false;
    }
    return (
      <AppContext.Provider
        value={{
          user: user,
          loggedIn: loggedIn,
          accessToken: this.state.accessToken,
          refreshToken: this.state.refreshToken,
          login: this.login,
          logout: this.logout
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
