import { FunctionComponent } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';

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
}));

const Home: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.form}>
        Hi there!
      </Paper>
    </div>
  );
};

export default Home;
