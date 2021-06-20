import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Calendar as EventIcon,
  // Home as HomeIcon,
  Settings as SettingsIcon,
  // ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
} from 'react-feather';
import axios from 'axios';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: HomeIcon,
    title: 'Главная'
  },
  {
    href: '/app/schedule',
    icon: EventIcon,
    title: 'Расписание',
  },
  {
    href: '/app/applicants',
    icon: UsersIcon,
    title: 'Абитуриенты'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Аккаунт'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Настройки'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [values, setValues] = useState({
    avatar: '',
    first_name: '',
    last_name: '',
    role: '',
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api_console/profile/get_profile/', {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }
    })
      .then((res) => {
        const profiledata = res.data.data.model;
        console.log(profiledata);
        setValues(profiledata);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      elevation={3}
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={values.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {values.first_name + ' ' + values.last_name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {values.role}
        </Typography>
        <Typography
          className={classes.dateText}
          color="textSecondary"
          variant="body1"
        >
          {`${moment().format('hh:mm A')}`}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Divider />
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          DKU, Almaty 2021
        </Typography>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
