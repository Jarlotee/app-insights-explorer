import { FunctionComponent, useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import useDashboard from '../../hooks/useDashboardContext';

import DashboardToolbar from './_toolbar';
import DashboardContainerEdit from './_container-edit';
import DashboardContainerDisplay from './_container-display';
import DashboardPicker from './_picker';

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

const Dashboard: FunctionComponent = () => {
  const classes = useStyles();

  const { isEditing } = useDashboard();

  let body = null;

  if (isEditing) {
    body = <DashboardContainerEdit />;
  } else {
    body = <DashboardContainerDisplay />;
  }

  return (
    <div id="dashboard" className={classes.root}>
      <DashboardPicker />
      <DashboardToolbar />
      {body}
    </div>
  );
};

export default Dashboard;
