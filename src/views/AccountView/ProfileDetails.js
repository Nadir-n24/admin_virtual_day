import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import axios from 'axios';

const languages = [
  {
    value: 'en',
    label: 'Английский'
  },
  {
    value: 'ru',
    label: 'Русский'
  },
  {
    value: 'kz',
    label: 'Казахский'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    language: ''
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

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
    axios.post('http://127.0.0.1:8000/api_console/profile/update_profile/', {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      },
      data: values
    })
      .then((res) => {
        const profiledata = res.data.data.model;
        console.log(profiledata);
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
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Редактировать информацию"
          title="Профиль"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Имя"
                name="first_name"
                onChange={handleChange}
                required
                value={values.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Фамилия"
                name="last_name"
                onChange={handleChange}
                required
                value={values.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Почтовый адрес"
                name="email"
                defaultValue="Your Email"
                InputProps={{
                  readOnly: true,
                }}
                value={values.email}
                variant="filled"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Номер телефона"
                name="phone"
                onChange={handleChange}
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Адрес"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Выберите язык"
                name="language"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.language}
                variant="outlined"
              >
                {languages.map((option) => (
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
            Cохранить
          </Button>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Информация сохранена"
            key={vertical + horizontal}
          />
        </Box>
      </Card>
    </form>
  );
};

export default ProfileDetails;
