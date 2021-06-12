import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ApplicantsListView = () => {
  const classes = useStyles();
  const [customers] = useState({
    address: 'kz',
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: 'akpayev.nadir@gmail.com',
    name: 'Akpayev Nadir',
    phone: '707-575-0991'
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api_console/user/', {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }
    })
      .then((res) => {
        const [profiledata] = res.data.data.model;
        console.log(profiledata);
        setValues(profiledata);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Абитуриенты"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default ApplicantsListView;
