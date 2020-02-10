import { FunctionComponent, CSSProperties, useRef } from 'react';

import classnames from 'classnames';

import { Paper, makeStyles, Theme } from '@material-ui/core';

import { DashboardItem } from '../../../../../models';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import useResize from '../../../../../hooks/useResize';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 2,
  },
  paper: {
    flexGrow: 1,
  },
  dragging: {
    display: 'none !important',
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '14px',
    height: '14px',
    margin: theme.spacing(0.75),
    borderRight: '2px solid #1c2733',
    borderBottom: '2px solid #1c2733',
    cursor: 'grab'
  },
}));

type ConnectionDashboardTileBaseProps = {
  className?: string;
  item: DashboardItem;
  row: number;
  column: number;
  onResize: (item: DashboardItem) => void;
};

const ConnectionDashboardTileBase: FunctionComponent<ConnectionDashboardTileBaseProps> = ({
  children,
  className,
  item,
  row,
  column,
  onResize,
}) => {
  const classes = useStyles();
  const resizeRef = useRef<HTMLDivElement>();

  const onDragEnd = final => {
    const newItem = JSON.parse(JSON.stringify(item));
    const width = item.width + final.width;
    const height = item.height + final.height;

    newItem.width = width > 0 ? width : 1;
    newItem.height = height > 0 ? height : 1;

    onResize(newItem);
  };

  const offset = useResize(resizeRef, onDragEnd);

  const collect = (monitor: DragSourceMonitor) => ({ isDragging: monitor.isDragging() });

  const [{ isDragging }, ref] = useDrag({ item, collect });

  const classNames = classnames(className, classes.paper);

  const columns = item.width + offset.width;
  const rows = item.height + offset.height;

  const style: CSSProperties = {
    gridColumnStart: column,
    gridColumnEnd: (columns > 0 ? columns : 1) + column,
    gridRowStart: row,
    gridRowEnd: (rows > 0 ? rows : 1) + row,
  };

  return (
    <div className={classnames(classes.root, { [classes.dragging]: isDragging })} style={style}>
      <Paper ref={ref} className={classNames}>
        {children}
      </Paper>
      <div ref={resizeRef} className={classes.icon} />
    </div>
  );
};

export default ConnectionDashboardTileBase;
