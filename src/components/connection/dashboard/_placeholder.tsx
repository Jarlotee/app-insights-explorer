import { FunctionComponent } from 'react';
import classnames from 'classnames';

import { Theme, makeStyles } from '@material-ui/core';
import { useDrop, DropTargetMonitor } from 'react-dnd';

import { ItemTypes } from './_constants';

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
  row: number;
  column: number;
};

const ConnectionDashboardPlaceholder: FunctionComponent<ConnectionDashboardPlaceholderProps> = ({
  row,
  column,
}) => {
  const classes = useStyles();
  const [{ highlighted }, ref] = useDrop({ accept, collect });

  return (
    <div
      className={classnames(classes.root, { [classes.highlighted]: highlighted })}
      ref={ref}
      title={`[${row}-${column}]`}
    />
  );
};

export default ConnectionDashboardPlaceholder;
