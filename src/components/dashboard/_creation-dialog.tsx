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
  const appNameRef = useRef<HTMLInputElement>(null);
  const appIdRef = useRef<HTMLInputElement>(null);
  const apiKeyRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();
  const { onSave } = useConnectionContext();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = await verify(appIdRef.current.value, apiKeyRef.current.value);
    if (isValid) {
      setError(null);
      onSave({
        name: appNameRef.current.value,
        id: appIdRef.current.value,
        key: apiKeyRef.current.value,
      });
      onClose();
    } else {
      setError('Error validating credentials, please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <form ref={formRef} onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">Create New Connection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new connection by entering a descriptive name, app insights identifier and key.
          </DialogContentText>
          <DialogContentText>
            The new connection will be securly stored in your browser.
          </DialogContentText>
          <TextField
            inputRef={appNameRef}
            label="Name"
            className={classes.field}
            required={true}
            autoComplete="app-name"
            margin="dense"
          />
          <TextField
            inputRef={appIdRef}
            label="Application ID"
            className={classes.field}
            required={true}
            autoComplete="app-id"
            margin="dense"
          />
          <TextField
            inputRef={apiKeyRef}
            label="API Key"
            className={classes.field}
            required={true}
            autoComplete="app-key"
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
