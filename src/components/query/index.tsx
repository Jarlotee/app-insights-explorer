import { FunctionComponent } from 'react';

import { useRouter } from 'next/router';

import { makeStyles, Theme } from '@material-ui/core';

import useConnection from '../../hooks/useConnection';
import useQuery from '../../hooks/useQuery';
import useDashboard from '../../hooks/useDashboard';

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
  const router = useRouter();

  const { connection } = useConnection();

  const onPin = () => {
    router.push('/dashboard');
  };

  const { onPush } = useDashboard(connection ? connection.name : '');

  const { query, setQuery, error, isRunning, results } = useQuery(connection);

  return (
    <div className={classes.root}>
      <Form
        setQuery={setQuery}
        query={query}
        error={error}
        isRunning={isRunning}
        onDashboardPush={onPush}
        onPin={onPin}
      />
      <div className={classes.results}>
        <Results query={query} results={results} />
      </div>
    </div>
  );
};

export default Query;
