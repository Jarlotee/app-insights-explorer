import { FunctionComponent, useState, useRef, Dispatch, SetStateAction } from 'react';

import { Toolbar, Button, Theme, makeStyles, TextField } from '@material-ui/core';

import HistoryIcon from '@material-ui/icons/History';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LanguageIcon from '@material-ui/icons/Language';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import PinDropIcon from '@material-ui/icons/PinDrop';

import ConnectionQueryHistory from './_history';
import { DashboardItem, DashboardQueryItem } from '../../models';
import { ItemTypes } from '../connection/dashboard/_constants';
import ConnectionPicker from '../connection/picker';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    overflow: 'auto',
  },
  menuButton: {
    minWidth: theme.spacing(12),
    marginRight: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: '15px',
      marginBottom: '2px',
    },
  },
  menuButtonEnd: {
    minWidth: theme.spacing(12),
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: '15px',
      marginBottom: '2px',
    },
  },
}));

type QueryFormProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  error: string;
  isRunning: boolean;
  onDashboardPush: (item: DashboardItem) => void;
  onPin: () => void;
};

const QueryForm: FunctionComponent<QueryFormProps> = ({
  query,
  setQuery,
  error,
  isRunning,
  onDashboardPush,
  onPin,
}) => {
  const classes = useStyles();
  const queryRef = useRef<HTMLInputElement>();
  const [isQueryHistoryOpen, setIsQueryHistoryOpen] = useState();

  const handleRunClick = () => setQuery(queryRef.current.value);
  const handleHistoryClick = () => setIsQueryHistoryOpen(s => !s);
  const handleSetQuery = (query: string) => (queryRef.current.value = query);
  const handleFormatQuery = () => {
    queryRef.current.value = queryRef.current.value
      .replace(/\s{2,}/g, ' ')
      .replace(/\s*\|/g, '\n|')
      .trim();
  };
  const handlePinClick = () => {
    const item: DashboardQueryItem = {
      type: ItemTypes.query,
      title: 'New Query',
      query: query,
      width: 7,
      height: 5,
    };
    onDashboardPush(item);
    onPin();
  };

  return (
    <>
      <ConnectionQueryHistory
        isOpen={isQueryHistoryOpen}
        handleToggle={handleHistoryClick}
        handleSetQuery={handleSetQuery}
      />
      <ConnectionPicker />
      <Toolbar variant="dense" disableGutters={true} className={classes.toolbar}>
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
        <Button
          size="small"
          variant="outlined"
          startIcon={<FormatAlignLeftIcon />}
          className={classes.menuButton}
          onClick={handleFormatQuery}
        >
          Format
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<PinDropIcon />}
          className={classes.menuButtonEnd}
          disabled={!query || isRunning || !!error}
          onClick={handlePinClick}
        >
          Pin
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<LanguageIcon />}
          href="https://docs.microsoft.com/en-us/azure/kusto/query/"
          rel="noopener"
          target="_blank"
        >
          Reference
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

export default QueryForm;
