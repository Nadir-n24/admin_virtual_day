import React from 'react';
import {
  Container,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ScheduleView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Расписание"
    >
      <Container maxWidth={false}>
        <Typography
          color="textPrimary"
          variant="h2"
        >
          СЮДА РАСПИСАНИЕ ВСТРОИТЬ
        </Typography>
      </Container>
    </Page>
  );
};

export default ScheduleView;
