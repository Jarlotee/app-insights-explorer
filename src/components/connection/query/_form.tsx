import { FunctionComponent, useState, useRef, Dispatch, SetStateAction } from 'react';

import { Toolbar, Button, Theme, makeStyles, TextField } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import ConnectionQueryHistory from './_history';

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    minWidth: theme.spacing(12),
    marginRight: theme.spacing(1),
  },
}));

type ConnectionQueryFormProps = {
  setQuery: Dispatch<SetStateAction<string>>;
  error: string;
  isRunning: boolean;
};

const ConnectionQueryForm: FunctionComponent<ConnectionQueryFormProps> = ({
  setQuery,
  error,
  isRunning,
}) => {
  const classes = useStyles();
  const queryRef = useRef<HTMLInputElement>();
  const [isQueryHistoryOpen, setIsQueryHistoryOpen] = useState();

  const handleRunClick = () => setQuery(queryRef.current.value);
  const handleHistoryClick = () => setIsQueryHistoryOpen(s => !s);
  const handleSetQuery = (query: string) => (queryRef.current.value = query);

  return (
    <>
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
    </>
  );
};

export default ConnectionQueryForm;
