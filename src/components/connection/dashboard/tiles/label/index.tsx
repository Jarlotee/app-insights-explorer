import { FunctionComponent, CSSProperties } from 'react';

import classnames from 'classnames';

import { Paper, Typography, makeStyles, Theme } from '@material-ui/core';
import { DashboardItem } from '../../../../../models';
import { DragSourceMonitor, useDrag } from 'react-dnd';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  dragging: {
    opacity: 0.1,
  },
}));

type DashboardLabelTileProps = {
  item: DashboardItem;
};

const DashboardLabelTile: FunctionComponent<DashboardLabelTileProps> = ({ item }) => {
  const classes = useStyles();
  const collect = (monitor: DragSourceMonitor) => ({ isDragging: monitor.isDragging() });

  const [{ isDragging }, ref] = useDrag({ item, collect });


  const style: CSSProperties = {
    gridColumn: `span ${item.width}`,
    gridRow: `span ${item.height}`,
  };

  return (
    <Paper ref={ref} className={classnames(classes.root, {[classes.dragging]: isDragging})} style={style}>
      <Typography variant="h5">{item.config.primary}</Typography>
    </Paper>
  );
};

export default DashboardLabelTile;
