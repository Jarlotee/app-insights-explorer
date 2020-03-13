import { FunctionComponent, FormEvent, useRef, useState } from 'react';

import {
  makeStyles,
  Theme,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import useDashboardContext from '../../hooks/useDashboardContext';

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

type DashboardCreationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DashboardCreationDialog: FunctionComponent<DashboardCreationDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const classes = useStyles();
  const formRef = useRef<HTMLFormElement>(null);
  const dashboardNameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();
  const { onCreate } = useDashboardContext();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = dashboardNameRef.current.value;

    const error = onCreate(name);

    if (!!error) {
      setError(error);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <form ref={formRef} onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">Create New Connection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new dashboard by entering a descriptive name.
          </DialogContentText>
          <TextField
            inputRef={dashboardNameRef}
            label="Name"
            className={classes.field}
            required={true}
            autoComplete="dashboard-name"
            margin="dense"
          />
          <DialogContentText style={{ color: 'red' }}>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DashboardCreationDialog;
