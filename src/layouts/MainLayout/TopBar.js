import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Paper
} from '@material-ui/core';
import Logo from 'src/components/Logo';

const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <AppBar
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Toolbar className={classes.toolbar}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
