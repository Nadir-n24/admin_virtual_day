import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/app', { replace: true });
    }
  }, []);

  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };

  const handleOnSubmit = (values, actions) => {
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api_console/profile/login/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: values
    })
      .then(response => {
        actions.setSubmitting(false);
        actions.resetForm();
        handleServerResponse(true, 'проверка, если вы видите эту надпись, вы должны были быть уже в /app/dashboard!');
        console.log(JSON.stringify(response.data));
        localStorage.setItem('token', JSON.stringify(response.data.data.token).replaceAll('"', ''));
        localStorage.setItem('role', JSON.stringify(response.data.data.role).replaceAll('"', ''));
        sessionStorage.setItem('token', JSON.stringify(response.data.data.token));
        console.log(values);
        navigate('/app/dashboard', { replace: true });
      })
      .catch(error => {
        actions.setSubmitting(false);
        console.log(error);
      });
  };

  return (
    <Page
      className={classes.root}
      title="Логин"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Введите действующий адрес электронной почты').max(255).required('Введите адрес электронной почты'),
              password: Yup.string().max(255).required('Введите пароль')
            })}
            onSubmit={handleOnSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="h2"
                  >
                    Вход
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Адрес электронной почты"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Пароль"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Войти
                  </Button>
                  {serverState && (
                    <p className={!serverState.ok ? 'errorMsg' : ''}>
                      {serverState.msg}
                    </p>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
