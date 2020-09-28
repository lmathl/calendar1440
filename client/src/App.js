import React from 'react';
import { isExpired } from "react-jwt";
import { Provider } from "react-redux";
import './App.css';
import Calendar from './components/Calendar';
import Custom from './components/Custom';
import LoginPage from './components/LoginPage';
import store from './store';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      msg: '',
      token: '',
    }
  }

  componentDidMount() {
    const obj = JSON.parse(localStorage.getItem('app')) || '';
    if (obj && obj.token) {
      const { token } = obj;

      const isMyTokenExpired = isExpired(token);
      console.log("session expired", isMyTokenExpired);
      if (!isMyTokenExpired) {
        this.setState({
          token,
        });
      } else {
        this.logout()
      }
    }
  }

  logout = (e) => {
    e.preventDefault();
    const obj = JSON.parse(localStorage.getItem('app')) || '';

    if (obj && obj.token) {
      localStorage.setItem('app', JSON.stringify(""));
      window.location.reload();
    }
  }

  render() {
    const { token } = this.state;

    if (token) {
      return (
        <Provider store={ store }>
          <div>
            <Calendar />
            <Custom logout={ this.logout } />
          </div>
        </Provider>
      );
    } else {
      return (
        <LoginPage />
      );
    }
  }
}

export default App;
