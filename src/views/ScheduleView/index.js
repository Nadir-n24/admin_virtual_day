import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Schedule from './Schedule';

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
        <Schedule />
      </Container>
    </Page>
  );
};

export default ScheduleView;
