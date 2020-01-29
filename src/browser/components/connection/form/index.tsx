import { FunctionComponent, FormEvent, useRef } from 'react';

import { makeStyles, Theme, TextField, Typography, Button } from '@material-ui/core';

import { verify } from '../../../gateways/app-insights';
import { saveConnection } from '../../../gateways/settings';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    width: '100%',
    margin: theme.spacing(.5, 0),
  },
  button: {
    margin: theme.spacing(3, 0, 0),
    alignSelf: 'flex-end',
  },
}));

const ConnectionForm: FunctionComponent = () => {
  const classes = useStyles();
  const formRef = useRef<HTMLFormElement>(null);
  const appNameRef = useRef<HTMLInputElement>(null);
  const appIdRef = useRef<HTMLInputElement>(null);
  const apiKeyRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = await verify(appIdRef.current.value, apiKeyRef.current.value);
    if (isValid) {
      saveConnection({
        name: appNameRef.current.value,
        id: appIdRef.current.value,
        key: apiKeyRef.current.value,
      });

      formRef.current.reset();
    }
  };

  return (
    <form ref={formRef} className={classes.form} onSubmit={onSubmit}>
      <Typography variant="subtitle2" component="h2">
        New Connection
      </Typography>
      <TextField
        inputRef={appNameRef}
        label="Name"
        className={classes.field}
        required={true}
        autoComplete="app-name"
      />
      <TextField
        inputRef={appIdRef}
        label="Application ID"
        className={classes.field}
        required={true}
        autoComplete="app-id"
      />
      <TextField
        inputRef={apiKeyRef}
        label="API Key"
        className={classes.field}
        required={true}
        autoComplete="app-key"
      />
      <Button className={classes.button} variant="outlined" color="primary" type="submit">
        Verify
      </Button>
    </form>
  );
};

export default ConnectionForm;
