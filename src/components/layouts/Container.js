import React, { Component } from 'react';
import './Container.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LoginIndicator from '../widgets/LoginIndicator';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainContainer: {
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '20px',
    marginRight: '20px'
  }
});

class Container extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <Grid container spacing={24}>
          <Grid item xs={2}>
            <LoginIndicator />
          </Grid>
          <Grid item xs={9}>
            {this.props.children}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Container);
