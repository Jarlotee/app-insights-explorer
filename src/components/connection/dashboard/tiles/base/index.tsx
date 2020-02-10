import { FunctionComponent, CSSProperties, useRef } from 'react';

import classnames from 'classnames';

import { DragSourceMonitor, useDrag } from 'react-dnd';

import { Paper, makeStyles, Theme } from '@material-ui/core';

import { DashboardItem } from '../../../../../models';

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
  edit: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: '16px',
    height: '14px',
    margin: theme.spacing(-0.5, 0.5),
    cursor: 'pointer',
    display: 'none',
    ['$root:hover &']: {
      display: 'block',
    },
  },
  resize: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '14px',
    height: '14px',
    margin: theme.spacing(0.5),
    borderRight: '2px solid #1c2733',
    borderBottom: '2px solid #1c2733',
    cursor: 'grab',
  },
}));

type ConnectionDashboardTileBaseProps = {
  className?: string;
  item: DashboardItem;
  row: number;
  column: number;
  onEdit: (item: DashboardItem) => void;
  onItemEdit: () => void;
};

const ConnectionDashboardTileBase: FunctionComponent<ConnectionDashboardTileBaseProps> = ({
  children,
  className,
  item,
  row,
  column,
  onEdit,
  onItemEdit,
}) => {
  const classes = useStyles();
  const resizeRef = useRef<HTMLDivElement>();

  const onDragEnd = final => {
    const width = item.width + final.width;
    const height = item.height + final.height;

    item.width = width > 0 ? width : 1;
    item.height = height > 0 ? height : 1;

    onEdit(item);
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
      <div className={classes.edit} title="edit" onClick={onItemEdit}>
        ...
      </div>
      <div ref={resizeRef} title="resize" className={classes.resize} />
    </div>
  );
};

export default ConnectionDashboardTileBase;
