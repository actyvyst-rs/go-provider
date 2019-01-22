import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    fontSize: 30
  }
});

class Landing extends Component {
  propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <h2>Landing</h2>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Landing);
