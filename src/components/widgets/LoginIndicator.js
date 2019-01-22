import React, { Component } from 'react';
import { AppContextConsumer, AppContext } from '../AppContext';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const styles = {
  card: {
    minWidth: 80
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class LoginIndicator extends Component {
  handleSubmit = (event, logout) => {
    if (this.context.loggedIn) {
      logout();
    } else {
      this.props.history.push('/login');
    }
  };

  userRenderer = (loggedIn, user) => {
    if (!loggedIn) {
      return <React.Fragment />;
    }

    const dateIssued = new Date(parseInt(user.iat) * 1000);
    const dateExpires = new Date(parseInt(user.exp) * 1000);
    const issued = dateIssued.toTimeString();
    const expires = dateExpires.toTimeString();

    return (
      <React.Fragment>
        <Typography>
          {loggedIn ? `User: ${user.firstName} ${user.lastName}` : ''}{' '}
        </Typography>
        <Typography>{loggedIn ? `email: ${user.email}` : ''} </Typography>
        <Typography>
          {loggedIn ? `IsProvider: ${user.isProvider ? 'yes' : 'no'}` : ''}
        </Typography>
        <Typography>{loggedIn ? `Token issued: ${issued}` : ''}</Typography>
        <Typography>{loggedIn ? `Token expires: ${expires}` : ''}</Typography>
      </React.Fragment>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <AppContextConsumer>
        {({ login, logout, loggedIn, user }) => (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5">Login status</Typography>
              <Typography>{loggedIn ? 'Logged in' : 'Logged out'} </Typography>
              {this.userRenderer(loggedIn, user)}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={event => this.handleSubmit(event, logout)}
              >
                {loggedIn ? 'Logout' : 'Login'}
              </Button>
            </CardActions>
          </Card>
        )}
      </AppContextConsumer>
    );
  }
}
LoginIndicator.contextType = AppContext;

export default withRouter(withStyles(styles)(LoginIndicator));
