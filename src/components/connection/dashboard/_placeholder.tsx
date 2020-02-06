import { FunctionComponent } from 'react';
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

  return (
    <div
      className={classnames(classes.root, { [classes.highlighted]: highlighted })}
      ref={ref}
      title={`[${row}-${column}-${index}]`}
    />
  );
};

export default ConnectionDashboardPlaceholder;
