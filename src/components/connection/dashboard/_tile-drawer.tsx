import { FunctionComponent } from 'react';

import { ListSubheader, List, Paper, makeStyles, Theme } from '@material-ui/core';

import ConnectionDashboardTileNewLabel from './tiles/new-label';
import ConnectionDashboardTileNewQuery from './tiles/new-query';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginRight: theme.spacing(1),
    minWidth: theme.spacing(32),
  },
}));

const ConnectionDashboardTileDrawer: FunctionComponent = () => {
  const classes = useStyles();
  const header = <ListSubheader>Tiles</ListSubheader>;

  return (
    <Paper className={classes.root}>
      <List component="ul" subheader={header}>
        {<ConnectionDashboardTileNewLabel key={0} />}
        {<ConnectionDashboardTileNewQuery key={1} />}
      </List>
    </Paper>
  );
};

export default ConnectionDashboardTileDrawer;
