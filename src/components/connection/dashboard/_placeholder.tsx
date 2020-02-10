import { FunctionComponent, CSSProperties } from 'react';
import classnames from 'classnames';

import { Theme, makeStyles } from '@material-ui/core';
import { useDrop, DropTargetMonitor } from 'react-dnd';

import { ItemTypes } from './_constants';
import { DashboardItem } from '../../../models';

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

const accept = [ItemTypes.label, ItemTypes.chart];

type ConnectionDashboardPlaceholderProps = {
  index: number;
  row: number;
  column: number;
  onDrop: (item: DashboardItem, anchor: number) => void;
};

const ConnectionDashboardPlaceholder: FunctionComponent<ConnectionDashboardPlaceholderProps> = ({
  index,
  row,
  column,
  onDrop,
}) => {
  const classes = useStyles();
  const canDrop = (item: DashboardItem) => {
    if (column + item.width - 1 > 59) return false;
    if (row + item.height - 1 > 30) return false;
    return true;
  };
  const drop = item => onDrop(item, index);
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
