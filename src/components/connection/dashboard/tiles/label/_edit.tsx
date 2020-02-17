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

import { DashboardItem, DashboardLabelItem } from '../../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    minWidth: '300px',
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  field: {
    width: '100%',
    margin: theme.spacing(0.5, 0),
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

type ConnectionDashboardLabelTileEditProps = {
  isOpen: boolean;
  onClose: () => void;
  item: DashboardLabelItem;
  onEdit: (item: DashboardItem) => void;
  onDelete: (item: DashboardItem) => void;
};

const ConnectionDashboardLabelTileEdit: FunctionComponent<ConnectionDashboardLabelTileEditProps> = ({
  isOpen,
  onClose,
  item,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles();
  const root = usePortal();
  const primaryTextRef = useRef<HTMLFormElement>(null);
  const secondaryTextRef = useRef<HTMLFormElement>(null);

  const handleOnDelete = () => {
    onDelete(item);
  };

  if (!root) {
    return null;
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    item.title = primaryTextRef.current.value;
    item.subTitle = secondaryTextRef.current.value;

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
          inputRef={primaryTextRef}
          className={classes.field}
          defaultValue={item.title}
          label="Title"
          required={true}
        />
        <TextField
          inputRef={secondaryTextRef}
          className={classes.field}
          defaultValue={item.subTitle}
          label="Subtitle"
          required={false}
        />
        <Button className={classes.submit} variant="outlined" color="primary" type="submit">
          Save
        </Button>
      </form>
    </Drawer>
  );

  return createPortal(element, root);
};

export default ConnectionDashboardLabelTileEdit;
