import { FunctionComponent } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';

import ConnectionForm from '../connection/form';
import ConnectionHistory from '../connection/history';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  form: {
    margin: theme.spacing(3, 3),
    padding: theme.spacing(2, 2),
    width: '400px',
    maxWidth: '100%',
  },
  history: {
    margin: theme.spacing(3, 3),
    padding: theme.spacing(0, 0),
    width: '400px',
    maxWidth: '100%',
  },
}));

const Home: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.history}>
        <ConnectionHistory />
      </Paper>
      <Paper className={classes.form}>
        <ConnectionForm />
      </Paper>
    </div>
  );
};

export default Home;
