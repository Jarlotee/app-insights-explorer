import { FunctionComponent } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import useConnectionContext from '../../hooks/useConnectionContext';
import useQuery from '../../hooks/useQuery';

import Form from './_form';
import Results from '../results';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 0,
    padding: theme.spacing(2, 0),
  },
  results: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    margin: theme.spacing(1, 0),
    overflow: 'auto',
  },
}));

type QueryProps = {};

const Query: FunctionComponent<QueryProps> = () => {
  const classes = useStyles();

  const { connection } = useConnectionContext();

  const { query, setQuery, error, isRunning, results } = useQuery(connection);

  return (
    <div className={classes.root}>
      <Form setQuery={setQuery} query={query} error={error} isRunning={isRunning} />
      <div className={classes.results}>
        <Results query={query} results={results} />
      </div>
    </div>
  );
};

export default Query;
