import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Header, Footer } from './layouts';
import Landing from './pages/Landing';
import Products from './pages/Products';
import Login from './pages/Login';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, indigo, red } from '@material-ui/core/colors';
import Container from './layouts/Container';
import { AppContextProvider } from './AppContext';

const Account = () => <h2>Account</h2>;
const Support = () => <h2>Support</h2>;

// const ActivitiesNew = () => <h2>Activities New</h2>;

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppContextProvider>
          <CssBaseline />
          <Fragment className="App">
            <BrowserRouter>
              <React.Fragment>
                <Header />
                <Container>
                  {/* <div style={{ marginLeft: 100 }}> */}
                  <Route path="/" exact={true} component={Landing} />
                  <Route exact path="/products" component={Products} />
                  <Route exact path="/account" component={Account} />
                  <Route exact path="/support" component={Support} />
                  <Route exact path="/login" component={Login} />
                  {/* <Route exact path="/activities/new" component={ActivitiesNew} /> */}
                </Container>
                {/* </div> */}
                <Footer />
              </React.Fragment>
            </BrowserRouter>
          </Fragment>
        </AppContextProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
