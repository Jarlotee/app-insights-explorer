import { FunctionComponent, useEffect } from 'react';

import classnames from 'classnames';

import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

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

  const item: DashboardLabelItem = {
    type: ItemTypes.label,
    width: 3,
    height: 1,
    title: 'Primary Text',
    subTitle: 'Secondary Text',
  };

  const [{ isDragging }, ref, preview] = useDrag({
    item,
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

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
