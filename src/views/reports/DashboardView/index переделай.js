import React from 'react';
import {
  Container,
  Grid,
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

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Главная"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Typography>
            здесь будет общая сводка и некоторые направляющие
          </Typography>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
