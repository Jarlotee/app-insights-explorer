import { FunctionComponent, useRef } from 'react';

import {
  TextField,
  makeStyles,
  Theme,
  Fab,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import useConnection from '../../../hooks/useConnection';
import useQuery from '../../../hooks/useQuery';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
  },
  fab: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(22),
    zIndex: 1,
  },
  fabProgress: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: theme.spacing(1.6),
    top: theme.spacing(21.5),
    zIndex: 1,
  },
  results: {
    margin: theme.spacing(2, 0),
    flexGrow: 1,
  },
}));

const ConnectionQuery: FunctionComponent = () => {
  const queryRef = useRef<HTMLInputElement>();
  const classes = useStyles();
  const connection = useConnection();

  const [setQuery, error, isRunning, results] = useQuery(connection);

  const handleFabClick = () => {
    setQuery(queryRef.current.value);
  };

  let tcolumns = null;
  let trows = null;

  if (results && results.tables && results.tables[0]) {
    tcolumns = results.tables[0].columns.map((c, i) => (
      <TableCell key={i} align={i === 0 ? 'left' : 'right'}>{c.name}</TableCell>
    ));

    trows = results.tables[0].rows.map((r, i) => (
      <TableRow key={i}>
        {r.map((v, j) => (
          <TableCell key={j} align={j === 0 ? 'left' : 'right'}>{v}</TableCell>
        ))}
      </TableRow>
    ));
  }

  return (
    <div className={classes.root}>
      {isRunning && <CircularProgress size={48} className={classes.fabProgress} />}
      <Fab
        color="primary"
        size="small"
        className={classes.fab}
        onClick={handleFabClick}
        disabled={isRunning}
      >
        <PlayArrowIcon />
      </Fab>
      <TextField
        inputRef={queryRef}
        variant="outlined"
        multiline={true}
        placeholder="Type your query here"
        rows="10"
        color="secondary"
        error={!!error}
        helperText={error}
      />
      <TableContainer className={classes.results}>
        <Table size="small">
          <TableHead>
            <TableRow>{tcolumns}</TableRow>
          </TableHead>
          <TableBody>{trows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ConnectionQuery;
