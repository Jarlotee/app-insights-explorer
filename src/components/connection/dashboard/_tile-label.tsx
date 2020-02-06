import { FunctionComponent } from 'react';

import { useDrag } from 'react-dnd';

import { ListItem, ListItemText, ListItemIcon, makeStyles, Theme } from '@material-ui/core';

import LabelIcon from '@material-ui/icons/Label';
import { ItemTypes } from './_constants';
import { DashboardItem } from '../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '186px',
    height: '60px',
  },
}));

const ConnectionDashboardTileLabel: FunctionComponent = () => {
  const classes = useStyles();
  const item: DashboardItem = { type: ItemTypes.label, config: { name: 'New Label' } };
  const [_, ref] = useDrag({ item });

  return (
    <ListItem ref={ref} className={classes.root}>
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText>Label</ListItemText>
    </ListItem>
  );
};

export default ConnectionDashboardTileLabel;
