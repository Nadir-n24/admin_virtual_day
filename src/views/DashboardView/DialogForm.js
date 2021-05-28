import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  makeStyles,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(({
  root: {}
}));

const DialogForm = ({ className, ...rest }) => {
  const classes = useStyles();
  // const [values] = useState({
  //   day_date: ''
  // });

  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-05-19'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
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
                  value={selectedDate}
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
      </Card>
    </form>
  );
};

DialogForm.propTypes = {
  className: PropTypes.string
};

export default DialogForm;
