import { FunctionComponent } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import ConnectionDashboardToolbar from './_toolbar';
import ConnectionDashboardContainerEdit from './_container-edit';

import useConnection from '../../../hooks/useConnection';
import useDashboard from '../../../hooks/useDashboard';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    minHeight: 0,
    alignItems: 'stretch',
    padding: theme.spacing(2, 0, 0),
  },
}));

const ConnectionDashboard: FunctionComponent = () => {
  const classes = useStyles();
  const connection = useConnection();
  const { dashboard, onDrop, onEdit, onSave } = useDashboard(connection ? connection.name : '');

  const body = <ConnectionDashboardContainerEdit dashboard={dashboard} onDrop={onDrop} onEdit={onEdit} />;

  return (
    <div className={classes.root}>
      <ConnectionDashboardToolbar />
      {body}
    </div>
  );
};

export default ConnectionDashboard;
