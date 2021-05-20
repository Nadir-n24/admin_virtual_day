import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Snackbar
} from '@material-ui/core';

const event_types = [
  {
    value: '0',
    label: 'Лекция',
  },
  {
    value: '1',
    label: 'Билборд',
  },
  {
    value: '2',
    label: 'КЕКЛОЛОРБИДОЛ'
  }
];


const ScheduleToolbar = () => {
  const [values, setValues] = useState({
    period_start: '07:00',
    period_end: '22:00',
    event_type: '0'
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
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
    console.log(values);
  };

  return (
    <form>
      <Card>
        <CardHeader
          subheader="Создать событие в расписании"
          title="Расписание"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={1}
              md={6}
              xs={12}
            >
              <TextField
                id="period_start"
                label="Начало"
                name="period_start"
                type="time"
                onChange={handleChange}
                required
                value={values.period_start}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              lg={2}
              md={6}
              xs={12}
            >
              <TextField
                id="period_end"
                label="Конец"
                name="period_end"
                type="time"
                onChange={handleChange}
                required
                value={values.period_end}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Выберите тип события"
                name="event_type"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {event_types.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    name={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            {values.event_type === '0' ? (
              <Grid
                item
                lg={2}
                md={6}
                xs={12}
              >
                <TextField
                  label="0"
                  name="period_end"
                  onChange={handleChange}
                  required
                  value={values.period_end}
                  variant="outlined"
                />
              </Grid>
            ) : values.event_type === '1' ? (
              <Grid
                item
                lg={2}
                md={6}
                xs={12}
              >
                <TextField
                  id="period_end"
                  label="1"
                  name="period_end"
                  onChange={handleChange}
                  required
                  value={values.period_end}
                  variant="outlined"
                />
              </Grid>
            ) : (
              <Grid
                item
                lg={2}
                md={6}
                xs={12}
              >
                <TextField
                  id="class_room"
                  label="3"
                  name="class_room"
                  onChange={handleChange}
                  required
                  value={values.class_room}
                  variant="outlined"
                />
              </Grid>
            )}
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
            Создать
          </Button>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Событие создано"
            key={vertical + horizontal}
          />
        </Box>
      </Card>
    </form>
  );
};

export default ScheduleToolbar;
