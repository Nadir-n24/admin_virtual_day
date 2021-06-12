import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Snackbar,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const emails = [
  {
    'value': 'akpayev.nadir@gmail.com',
    'label': 'akpayev.nadir@gmail.com'
  },
  {
    'value': 'testadmin@mail.ru',
    'label': 'testadmin@mail.ru'
  },
  {
    'value': 'admin@gmail.com',
    'label': 'admin@gmail.com'
  }
];

const roles = [
  {
    'value': 0,
    'label': 'SUPER_ADMIN'
  },
  {
    'value': 1,
    'label': 'ADMIN'
  },
  {
    'value': 2,
    'label': 'MODERATOR'
  },
  {
    'value': 3,
    'label': 'SPEAKER'
  },
  {
    'value': 4,
    'label': 'STUDENT'
  }
];

const ChangeRole = ({ className, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: '',
    role: ''
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });



  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
    axios.put('http://127.0.0.1:8000/api_console/user/', {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token')
      },
      data: values
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Для изменения роли выберите пользователя и назначьте роль"
          title="Изменить роль"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Выберите роль"
                name="role"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {emails.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              className={classes.item}
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Выберите роль"
                name="role"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {roles.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}
            color="primary"
            variant="contained"
          >
            Изменить
          </Button>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Роль изменена"
            key={vertical + horizontal}
          />
        </Box>
      </Card>
    </form>
  );
};

ChangeRole.propTypes = {
  className: PropTypes.string
};

export default ChangeRole;
