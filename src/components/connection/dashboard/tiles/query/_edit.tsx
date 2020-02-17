import { FunctionComponent, useRef, FormEvent } from 'react';
import { createPortal } from 'react-dom';

import {
  Drawer,
  TextField,
  makeStyles,
  Theme,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import usePortal from '../../../../../hooks/usePortal';

import { DashboardItem, DashboardQueryItem } from '../../../../../models';

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

type ConnectionDashboardQueryTileEditProps = {
  isOpen: boolean;
  onClose: () => void;
  item: DashboardQueryItem;
  onEdit: (item: DashboardItem) => void;
  onDelete: (item: DashboardItem) => void;
};

const ConnectionDashboardQueryTileEdit: FunctionComponent<ConnectionDashboardQueryTileEditProps> = ({
  isOpen,
  onClose,
  item,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles();
  const root = usePortal();
  const labelRef = useRef<HTMLFormElement>(null);
  const queryRef = useRef<HTMLFormElement>(null);

  const handleOnDelete = () => {
    onDelete(item);
  };

  if (!root) {
    return null;
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    item.title = labelRef.current.value;
    item.query = queryRef.current.value;

    onEdit(item);
    onClose();
  };

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

export default ConnectionDashboardQueryTileEdit;
