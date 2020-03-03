import { FunctionComponent, useEffect } from 'react';

import classnames from 'classnames';

import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { ListItem, ListItemText, ListItemIcon, makeStyles, Theme } from '@material-ui/core';

import TableChartIcon from '@material-ui/icons/TableChart';

import { ItemTypes } from '../../_constants';

import { DashboardQueryItem } from '../../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '188px',
    height: '60px',
  },
  dragging: {
    opacity: 0.1,
  },
}));

const ConnectionDashboardTileQuery: FunctionComponent = () => {
  const classes = useStyles();

  const item: DashboardQueryItem = {
    type: ItemTypes.query,
    width: 7,
    height: 5,
    title: 'New Query',
    query: '',
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
        <TableChartIcon />
      </ListItemIcon>
      <ListItemText>Query</ListItemText>
    </ListItem>
  );
};

export default ConnectionDashboardTileQuery;
