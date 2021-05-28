import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';

const event_types = [
  {
    value: '0',
    label: 'Лекция',
  },
  {
    value: '1',
    label: 'Стэнд',
  }
];

const billboard_types = [
  {
    value: '0',
    label: 'Видео',
  },
  {
    value: '1',
    label: 'Презентация',
  }
];

const DialogForm = () => {
  const [values, setValues] = useState({
    period_start: '07:00',
    period_end: '22:00',
    event_type: '0',
    class_room: '410',
    speaker: '3',
    event: '3',
    url_link: 'link',
    pdf_file: 'pdf',
  });

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
            margin="20px"
          >
            <Grid
              item
              lg={3}
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
              lg={3}
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
          </Grid>
          {values.event_type === '0' ? (
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                lg={12}
                md={6}
                xs={12}
              >
                <TextField
                  label="Аудитория"
                  name="class_room"
                  onChange={handleChange}
                  required
                  value={values.class_room}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                lg={6}
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Выберите тип стэнда"
                  name="billboard_type"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  variant="outlined"
                >
                  {billboard_types.map((option) => (
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
              {values.billboard_type === '1' ? (
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={12}
                >
                  <TextField
                    label="Ссылка на pdf"
                    name="pdf"
                    onChange={handleChange}
                    required
                    value={values.pdf_file}
                    variant="outlined"
                  />
                </Grid>
              ) : (
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={12}
                >
                  <TextField
                    label="Ссылка на видео"
                    name="video"
                    onChange={handleChange}
                    required
                    value={values.url_link}
                    variant="outlined"
                  />
                </Grid>
              )}
            </Grid>
          )}
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

export default DialogForm;
