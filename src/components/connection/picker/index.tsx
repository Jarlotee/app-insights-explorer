import { FunctionComponent, useState } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Theme,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import useConnectionContext from '../../../hooks/useConnectionContext';
import ConnectionCreationDialog from '../creation-dialog';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 300,
    margin: theme.spacing(1, 0),
  },
  icon: {
    minWidth: 0,
    marginRight: theme.spacing(1),
  },
}));

const ConnectionPicker: FunctionComponent = ({}) => {
  const classes = useStyles();
  const { connection, connections, onChange } = useConnectionContext();
  const [creationDialogOpen, setCreationDialogOpen] = useState(false);
  const handleCreationDialogClose = () => setCreationDialogOpen(false);

  const handleChange = event => {
    if (event.target.value === 'new-connection') {
      setCreationDialogOpen(true);
    } else {
      onChange(event.target.value);
    }
  };

  let items = null;
  if (connections) {
    items = connections.map((conn, index) => (
      <MenuItem key={index} value={conn.name} dense={true}>
        <ListItemText primary={conn.name} />
      </MenuItem>
    ));
  }

  return (
    <>
      <FormControl variant="outlined" className={classes.root}>
        <InputLabel id="connection-picker-label" margin="dense">
          Connection
        </InputLabel>
        <Select
          value={connection ? connection.name : ''}
          onChange={handleChange}
          labelId="connection-picker-label"
          label="Connection"
          margin="dense"
        >
          {items}
          <MenuItem value="new-connection" dense={true}>
            <ListItemIcon className={classes.icon}>
              <AddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Create New Connection" />
          </MenuItem>
        </Select>
      </FormControl>
      <ConnectionCreationDialog isOpen={creationDialogOpen} onClose={handleCreationDialogClose} />
    </>
  );
};

export default ConnectionPicker;
