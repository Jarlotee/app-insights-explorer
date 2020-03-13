import { FunctionComponent, useRef, FormEvent, useState } from 'react';
import { createPortal } from 'react-dom';

import { Drawer, TextField, makeStyles, Theme, Typography, Button } from '@material-ui/core';

import usePortal from '../../hooks/usePortal';
import useDashboardContext from '../../hooks/useDashboardContext';

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
    margin: theme.spacing(1, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    alignSelf: 'flex-end',
  },
}));

type DashboardUploadDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DashboardUploadDrawer: FunctionComponent<DashboardUploadDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const classes = useStyles();
  const root = usePortal();
  const dashboardInputRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string>();

  const { onUpload, setIsEditing } = useDashboardContext();

  if (!root) {
    return null;
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = onUpload(dashboardInputRef.current.value);

    if (error) {
      setError(error);
      return;
    }

    setError(undefined);
    setIsEditing(true);
    onClose();
  };

  const element = (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <form className={classes.form} onSubmit={onSubmit}>
        <Typography variant="h5" className={classes.header}>
          Upload Dashboard
        </Typography>
        <TextField
          inputRef={dashboardInputRef}
          className={classes.field}
          label="Dashboard Definition"
          required={true}
          multiline={true}
          placeholder="Paste your dashboard here"
          rows="10"
          variant="outlined"
          error={!!error}
          helperText={error}
        />
        <Button className={classes.submit} variant="outlined" color="primary" type="submit">
          Overwrite
        </Button>
      </form>
    </Drawer>
  );

  return createPortal(element, root);
};

export default DashboardUploadDrawer;
