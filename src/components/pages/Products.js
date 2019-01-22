import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import { AppContextConsumer, AppContext } from '../AppContext';

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  tableRow: {
    cursor: 'pointer'
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: 'initial'
  }
});

class Products extends Component {
  propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    if (!this.context.loggedIn) {
      return (
        <React.Fragment>
          <h2>Products</h2>
          <p>
            <Typography>Access Denied</Typography>
          </p>
        </React.Fragment>
      );
    }

    const { classes, columns, ...tableProps } = this.props;
    return (
      <React.Fragment>
        <h2>Products</h2>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Header 1</TableCell>
              <TableCell>Header 2</TableCell>
              <TableCell>Header 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Content 1a</TableCell>
              <TableCell>Content 2a</TableCell>
              <TableCell>Content 3a</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

Products.contextType = AppContext;

export default withStyles(styles)(Products);
