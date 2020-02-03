import { FunctionComponent, useRef, useState } from 'react';

import {
  TextField,
  makeStyles,
  Theme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  Button,
} from '@material-ui/core';

import HistoryIcon from '@material-ui/icons/History';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import useConnection from '../../../hooks/useConnection';
import useQuery from '../../../hooks/useQuery';
import ConnectionQueryHistory from './_history';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    padding: theme.spacing(2, 0),
  },
  menuButton: {
    minWidth: theme.spacing(12),
    marginRight: theme.spacing(1),
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
  const [isQueryHistoryOpen, setIsQueryHistoryOpen] = useState();

  const handleRunClick = () => setQuery(queryRef.current.value);
  const handleHistoryClick = () => setIsQueryHistoryOpen(s => !s);
  const handleSetQuery = (query: string) => (queryRef.current.value = query);

  let tcolumns = null;
  let trows = null;

  if (results && results.tables && results.tables[0]) {
    tcolumns = results.tables[0].columns.map((c, i) => (
      <TableCell key={i} align={i === 0 ? 'left' : 'right'}>
        {c.name}
      </TableCell>
    ));

    trows = results.tables[0].rows.map((r, i) => (
      <TableRow key={i}>
        {r.map((v, j) => (
          <TableCell key={j} align={j === 0 ? 'left' : 'right'}>
            {v}
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  return (
    <div className={classes.root}>
      <ConnectionQueryHistory
        isOpen={isQueryHistoryOpen}
        handleToggle={handleHistoryClick}
        handleSetQuery={handleSetQuery}
      />
      <Toolbar variant="dense" disableGutters={true}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          className={classes.menuButton}
          startIcon={<PlayArrowIcon />}
          disabled={isRunning}
          onClick={handleRunClick}
        >
          Run
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<HistoryIcon />}
          className={classes.menuButton}
          onClick={handleHistoryClick}
        >
          History
        </Button>
      </Toolbar>
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
