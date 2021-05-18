import React, { useState } from 'react';
import {
  makeStyles,
  Container,
  Box
} from '@material-ui/core';
import Page from 'src/components/Page';
import ScheduleTable from './ScheduleTable';
import ScheduleToolbar from './ScheduleToolbar';
import data from './data';

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
  const [customers] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Расписание"
    >
      <Container maxWidth={false}>
        <ScheduleToolbar />
        <Box mt={3}>
          <ScheduleTable customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default ScheduleView;
