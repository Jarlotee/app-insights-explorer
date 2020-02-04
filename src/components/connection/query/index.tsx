import { FunctionComponent } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import useConnection from '../../../hooks/useConnection';
import useQuery from '../../../hooks/useQuery';

import ConnectionQueryForm from './_form';
import ConnectionQueryTable from './_table';
import ConnectionQueryPie from './_pie';

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

  const { query, setQuery, error, isRunning, results } = useQuery(connection);

  let view = null;

  if (query && query.match(/\|\s+render\s+piechart\s*$/i)) {
    view = <ConnectionQueryPie results={results} />
  } else {
    view = <ConnectionQueryTable results={results} />;
  }

  return (
    <div className={classes.root}>
      <ConnectionQueryForm setQuery={setQuery} error={error} isRunning={isRunning} />
      {view}
    </div>
  );
};

export default ConnectionQuery;
