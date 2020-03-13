import { FunctionComponent } from 'react';

import { ListSubheader, List, Paper, makeStyles, Theme } from '@material-ui/core';

import DashboardTileNewLabel from './tiles/new-label';
import DashboardTileNewQuery from './tiles/new-query';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginRight: theme.spacing(1),
    minWidth: theme.spacing(32),
  },
}));

const DashboardTileDrawer: FunctionComponent = () => {
  const classes = useStyles();
  const header = <ListSubheader>Tiles</ListSubheader>;

  return (
    <Paper className={classes.root}>
      <List component="ul" subheader={header}>
        {<DashboardTileNewLabel key={0} />}
        {<DashboardTileNewQuery key={1} />}
      </List>
    </Paper>
  );
};

export default DashboardTileDrawer;
