import React, { useState } from 'react'; // ,{ useState }
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Paper
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const handleOnClick = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  return (
    <Paper elevation={3}>
      <AppBar
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Toolbar>
          <RouterLink to="/app/dashboard">
            <Logo />
          </RouterLink>
          <Box flexGrow={1} />
          <Hidden mdDown>
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              href="/login"
              onClick={handleOnClick}
            >
              <InputIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              onClick={onMobileNavOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
