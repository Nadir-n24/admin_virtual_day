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

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const roles = [
  {
    value: '1',
    label: 'admin'
  },
  {
    value: '2',
    label: 'moderator'
  },
  {
    value: '1',
    label: 'superadmin'
  }
];

const emails = [
  {
    value: '1',
    label: 'test1@test.test'
  },
  {
    value: '2',
    label: 'test2@test.test'
  },
  {
    value: '3',
    label: 'test3@test.test'
  },
  {
    value: '4',
    label: 'test4@test.test'
  }
];

const Notifications = ({ className, ...rest }) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const [values, setValues] = useState({
    email: 'test1@test.test',
    id: '',
    role: 'admin'
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
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
                label="Выберите почтовый адрес пользователя"
                name="email"
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

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
