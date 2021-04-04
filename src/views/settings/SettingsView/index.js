import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Notifications from './Notifications';
import CreateAdmin from './CreateAdmin';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Настройки"
    >
      <Container maxWidth="lg">
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
            <CreateAdmin />
          </Grid>
          <Grid
            item
            lg={12}
            md={6}
            xs={12}
          >
            <Notifications />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default SettingsView;
