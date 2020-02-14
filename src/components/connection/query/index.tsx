import { FunctionComponent } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import useConnection from '../../../hooks/useConnection';
import useQuery from '../../../hooks/useQuery';

import ConnectionQueryForm from './_form';
import useDashboard from '../../../hooks/useDashboard';
import ConnectionResults from '../results';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    padding: theme.spacing(2, 0),
  },
}));

const ConnectionQuery: FunctionComponent = () => {
  const classes = useStyles();
  const connection = useConnection();

  const { onPush } = useDashboard(connection ? connection.name : '');

  const { query, setQuery, error, isRunning, results } = useQuery(connection);

  return (
    <div className={classes.root}>
      <ConnectionQueryForm setQuery={setQuery} query={query} error={error} isRunning={isRunning} onDashboardPush={onPush} />
      <ConnectionResults query={query} results={results} />
    </div>
  );
};

export default ConnectionQuery;
