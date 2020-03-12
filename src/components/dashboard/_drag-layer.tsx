import { FunctionComponent } from 'react';

import { useDragLayer, XYCoord } from 'react-dnd';

import { Theme, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  paper: {
    padding: theme.spacing(1, 2),
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: '1.25rem',
    lineHeight: 1.1,
  },
}));

const getDragStyles = (currentOffset: XYCoord, width: number, height: number) => {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;

  return {
    width: `${60 * width + 4 * (width - 1)}px`,
    height: `${60 * height + 4 * (height - 1)}px`,
    transform,
    WebkitTransform: transform,
  };
};

const DashboardDragLayer: FunctionComponent = () => {
  const classes = useStyles();

  const { item, isDragging, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div style={getDragStyles(currentOffset, item.width, item.height)}>
        <Paper className={classes.paper}>
          <Typography className={classes.title}>{item.title}</Typography>
        </Paper>
      </div>
    </div>
  );
};

export default DashboardDragLayer;
