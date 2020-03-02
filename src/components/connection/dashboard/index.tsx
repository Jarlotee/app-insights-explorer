import { FunctionComponent, useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import ConnectionDashboardToolbar from './_toolbar';
import ConnectionDashboardContainerEdit from './_container-edit';

import useConnection from '../../../hooks/useConnection';
import useDashboard from '../../../hooks/useDashboard';
import ConnectionDashboardContainerDisplay from './_container-display';

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

  const [isEditing, setIsEditing] = useState(false);

  const { dashboard, onDrop, onEdit, onSave, onDelete, onUpload } = useDashboard(
    connection ? connection.name : ''
  );

  const handleOnSave = () => {
    setIsEditing(false);
    onSave();
  };

  const handleOnEdit = () => {
    setIsEditing(true);
  };

  let body = null;

  if (isEditing) {
    body = (
      <ConnectionDashboardContainerEdit
        dashboard={dashboard}
        onDrop={onDrop}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  } else {
    body = <ConnectionDashboardContainerDisplay dashboard={dashboard} />;
  }

  return (
    <div id="dashboard" className={classes.root}>
      <ConnectionDashboardToolbar
        dashboard={dashboard}
        isEditing={isEditing}
        onEdit={handleOnEdit}
        onSave={handleOnSave}
        onUpload={onUpload}
      />
      {body}
    </div>
  );
};

export default ConnectionDashboard;
