import { FunctionComponent, CSSProperties, useRef } from 'react';

import classnames from 'classnames';

import { Paper, makeStyles, Theme } from '@material-ui/core';

import TextureIcon from '@material-ui/icons/Texture';

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
    clipPath: 'polygon(100% 0, 80% 0, 0 80%, 0 100%, 100% 100%)',
    position: 'absolute',
    bottom: 1,
    right: 1,
    fontSize: '18px',
    color: '#8c9196',
    cursor: 'grab',
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
  const resizeRef = useRef<SVGSVGElement>();

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
      <TextureIcon ref={resizeRef} className={classes.icon} />
    </div>
  );
};

export default ConnectionDashboardTileBase;
