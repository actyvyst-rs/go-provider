import React, { Component, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';
import { AuthAPI } from '../../modules/APIWrapper';
import { AppContextConsumer, AppContext } from '../AppContext';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class Login extends Component {
  propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValidEmail: false
    };
  }

  handleSubmit = async (event, login) => {
    if (!this.state.isValidEmail) {
      return alert('Email not valid');
    }
    try {
      await login(this.state.email, this.state.password);
      this.props.history.goBack();
    } catch (err) {
      alert(err);
    }
  };

  render() {
    const { classes } = this.props;
    if (this.context.loggedIn) {
      return (
        <AppContextConsumer>
          {({ user }) => (
            <React.Fragment>
              <Grid container>
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      You are logged in as:
                      <br />
                      {user.firstName} {user.lastName}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4} />
              </Grid>
            </React.Fragment>
          )}
        </AppContextConsumer>
      );
    }
    return (
      <AppContextConsumer>
        {({ login }) => (
          <React.Fragment>
            <Grid container>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Card>
                  <CardContent>
                    <h2>Login</h2>
                    <TextField
                      error={
                        this.state.email.length > 0 && !this.state.isValidEmail
                      }
                      label="Email"
                      type="email"
                      //   autoComplete="email"
                      placeHolde="Enter email"
                      onChange={event => {
                        this.setState({
                          email: event.target.value,
                          isValidEmail: validator.isEmail(event.target.value)
                        });
                      }}
                    />
                    <TextField
                      type="password"
                      label="Password"
                      //   autoComplete="password"
                      placeHolder="Enter password"
                      onChange={event =>
                        this.setState({ password: event.target.value })
                      }
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      primary={true}
                      className={classes.button}
                      label="Submit"
                      onClick={event => this.handleSubmit(event, login)}
                    >
                      Submit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </React.Fragment>
        )}
      </AppContextConsumer>
    );
  }
}
Login.contextType = AppContext;

export default withStyles(styles)(Login);
