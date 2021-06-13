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

const UsersListView = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api_console/user/', {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }
    })
      .then((res) => {
        console.log(res.data.data.model);
        setUsers(res.data.data.model);
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
          <Results users={users} />
        </Box>
      </Container>
    </Page>
  );
};

export default UsersListView;
