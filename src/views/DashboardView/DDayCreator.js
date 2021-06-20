import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(({
  root: {}
}));

const DDayCreator = ({ className, ...rest }) => {
  const classes = useStyles();
  // const [values] = useState({
  //   day_date: ''
  // });

  const [day_date, setday_date] = React.useState(new Date(moment().format('L')));

  const handleDateChange = (date) => {
    setday_date(date);
  };

  console.log(day_date);

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
    axios.post('http://127.0.0.1:8000/api_console/dod_day/', {
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      },
      data: day_date
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

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Создать мероприятие день открытых"
          title="День открытых дверей"
        />
        <Divider />
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
          >
            <form className={classes.container} noValidate>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={day_date}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </form>
          </Box>
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
            Создать
          </Button>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Мероприятие день открытых дверей создано"
            key={vertical + horizontal}
          />
        </Box>
      </Card>
    </form>
  );
};

DDayCreator.propTypes = {
  className: PropTypes.string
};

export default DDayCreator;
