import { FunctionComponent } from 'react';

import { Typography, makeStyles, Theme } from '@material-ui/core';

import ConnectionDashboardTileBase from '../base';

import { DashboardItem } from '../../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },
}));

type DashboardLabelTileProps = {
  item: DashboardItem;
  row: number;
  column: number;
  onResize: (item: DashboardItem) => void;
};

const DashboardLabelTile: FunctionComponent<DashboardLabelTileProps> = ({
  item,
  row,
  column,
  onResize,
}) => {
  const classes = useStyles();

  return (
    <ConnectionDashboardTileBase
      className={classes.root}
      item={item}
      row={row}
      column={column}
      onResize={onResize}
    >
      <Typography variant="h5">{item.config.primary}</Typography>
    </ConnectionDashboardTileBase>
  );
};

export default DashboardLabelTile;
