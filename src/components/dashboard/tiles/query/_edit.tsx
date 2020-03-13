import { FunctionComponent, useRef, FormEvent, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  Drawer,
  TextField,
  makeStyles,
  Theme,
  Typography,
  Button,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { DashboardQueryItem } from '../../../../models';

import useDashboardContext from '../../../../hooks/useDashboardContext';
import usePortal from '../../../../hooks/usePortal';
import useConnectionContext from '../../../../hooks/useConnectionContext';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    minWidth: '500px',
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  field: {
    width: '100%',
    margin: theme.spacing(1, 0),
  },
  delete: {
    position: 'absolute',
    right: 5,
    top: 10,
    color: '#FA8E92',
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    alignSelf: 'flex-end',
  },
}));

type DashboardQueryTileEditProps = {
  isOpen: boolean;
  onClose: () => void;
  item: DashboardQueryItem;
};

const DashboardQueryTileEdit: FunctionComponent<DashboardQueryTileEditProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  const classes = useStyles();
  const root = usePortal();
  const labelRef = useRef<HTMLFormElement>(null);
  const queryRef = useRef<HTMLFormElement>(null);
  const { connections } = useConnectionContext();
  const { onEditItem, onDeleteItem } = useDashboardContext();
  const [updatedConnection, setUpdatedConnection] = useState(item.connection || '');

  const handleOnDelete = () => {
    onDeleteItem(item);
  };

  if (!root) {
    return null;
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    item.title = labelRef.current.value;
    item.query = queryRef.current.value;
    item.connection = updatedConnection;

    onEditItem(item);
    onClose();
  };

  const handleConnectionChange = event => {
    setUpdatedConnection(event.target.value);
  };

  const connectionOptions = connections.map((c, i) => (
    <MenuItem key={i} value={c.name}>
      {c.name}
    </MenuItem>
  ));

  const element = (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <form className={classes.form} onSubmit={onSubmit}>
        <IconButton
          aria-label="delete label"
          component="span"
          onClick={handleOnDelete}
          className={classes.delete}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5">Edit Label</Typography>
        <TextField
          inputRef={labelRef}
          className={classes.field}
          defaultValue={item.title}
          label="Title"
          required={true}
        />
        <FormControl className={classes.field}>
          <InputLabel id="connection-label">Connection</InputLabel>
          <Select
            labelId="connection-label"
            value={updatedConnection}
            onChange={handleConnectionChange}
          >
            {connectionOptions}
          </Select>
        </FormControl>
        <TextField
          inputRef={queryRef}
          className={classes.field}
          defaultValue={item.query}
          label="Query"
          required={true}
          multiline={true}
          placeholder="Type your query here"
          rows="10"
          variant="outlined"
        />
        <Button className={classes.submit} variant="outlined" color="primary" type="submit">
          Save
        </Button>
      </form>
    </Drawer>
  );

  return createPortal(element, root);
};

export default DashboardQueryTileEdit;
