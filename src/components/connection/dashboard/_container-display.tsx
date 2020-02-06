import { FunctionComponent } from 'react';

import { Theme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'scroll',
  },
}));

const ConnectionDashboardContainerDisplay: FunctionComponent = () => {
  const classes = useStyles();

  return <div className={classes.root}>Display Mode</div>;
};

export default ConnectionDashboardContainerDisplay;
