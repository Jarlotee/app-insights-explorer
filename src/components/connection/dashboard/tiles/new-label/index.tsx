import { FunctionComponent } from 'react';

import classnames from 'classnames';

import { useDrag, DragSourceMonitor } from 'react-dnd';

import { ListItem, ListItemText, ListItemIcon, makeStyles, Theme } from '@material-ui/core';

import LabelIcon from '@material-ui/icons/Label';
import { ItemTypes } from '../../_constants';
import { DashboardLabelItem } from '../../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '188px',
    height: '60px',
  },
  dragging: {
    opacity: 0.1,
  },
}));

const ConnectionDashboardTileLabel: FunctionComponent = () => {
  const classes = useStyles();
  const collect = (monitor: DragSourceMonitor) => ({ isDragging: monitor.isDragging() });
  const item: DashboardLabelItem = {
    type: ItemTypes.label,
    width: 3,
    height: 1,
    title: 'Primary Text',
    subTitle: 'Secondary Text',
  };

  const [{ isDragging }, ref] = useDrag({ item, collect });

  return (
    <ListItem ref={ref} className={classnames(classes.root, { [classes.dragging]: isDragging })}>
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText>Label</ListItemText>
    </ListItem>
  );
};

export default ConnectionDashboardTileLabel;
