import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import LectureCreator from './LectureCreator';
import EnhancedTable from './LectureTable';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LectureView = () => {
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
          <Grid
            item
            lg={4}
            md={3}
            xs={12}
          >
            <LectureCreator />
          </Grid>
          <Grid
            item
            lg={8}
            md={3}
            xs={12}
          >
            <EnhancedTable />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default LectureView;
