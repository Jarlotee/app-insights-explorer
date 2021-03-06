import { FunctionComponent, CSSProperties } from 'react';
import classnames from 'classnames';

import { Theme, makeStyles } from '@material-ui/core';
import { useDrop, DropTargetMonitor } from 'react-dnd';

import { ItemTypes } from './_constants';
import { DashboardItem, DashboardCoordinate } from '../../models';
import useDashboardContext from '../../hooks/useDashboardContext';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#1c2733',
    color: '#3e464f',
  },
  highlighted: {
    backgroundColor: '#3e464f',
  },
}));

const collect = (monitor: DropTargetMonitor) => ({
  highlighted: monitor.isOver() && monitor.canDrop(),
});

const accept = [ItemTypes.label, ItemTypes.query];

type ConnectionDashboardPlaceholderProps = {
  index: number;
  row: number;
  column: number;
};

const ConnectionDashboardPlaceholder: FunctionComponent<ConnectionDashboardPlaceholderProps> = ({
  index,
  row,
  column,
}) => {
  const classes = useStyles();
  const { onDropItem } = useDashboardContext();
  const canDrop = (item: DashboardItem) => {
    if (column + item.width - 1 > 59) return false;
    if (row + item.height - 1 > 30) return false;
    return true;
  };
  const drop = item => onDropItem(item, { row, column });
  const [{ highlighted }, ref] = useDrop({ accept, collect, canDrop, drop });

  const style: CSSProperties = {
    gridColumnStart: column,
    gridColumnEnd: column + 1,
    gridRowStart: row,
    gridRowEnd: row + 1,
  };

  return (
    <div
      className={classnames(classes.root, { [classes.highlighted]: highlighted })}
      style={style}
      ref={ref}
      title={`[${row}-${column}-${index}]`}
    />
  );
};

export default ConnectionDashboardPlaceholder;
