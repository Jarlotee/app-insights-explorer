import { FunctionComponent, CSSProperties } from 'react';

import { Paper, Typography, makeStyles, Theme } from '@material-ui/core';
import { DashboardItem } from '../../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
}));

type DashboardLabelTileProps = {
  item: DashboardItem;
};

const DashboardLabelTile: FunctionComponent<DashboardLabelTileProps> = ({ item }) => {
  const classes = useStyles();

  const style: CSSProperties = {
    gridColumn: `span ${item.width}`,
    gridRow: `span ${item.height}`,
  };

  return (
    <Paper className={classes.root} style={style}>
      <Typography variant="h5">{item.config.primary}</Typography>
    </Paper>
  );
};

export default DashboardLabelTile;
