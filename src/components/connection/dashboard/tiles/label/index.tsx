import { FunctionComponent, useState } from 'react';

import { Typography, makeStyles, Theme } from '@material-ui/core';

import ConnectionDashboardTileEditBase from '../edit-base';

import { DashboardItem, DashboardLabelItem } from '../../../../../models';

import ConnectionDashboardLabelTileEdit from './_edit';
import ConnectionDashboardTileBase from '../base';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(1, 2),
  },
  primary: {
    fontSize: '1.5rem',
    lineHeight: 1.1,
  },
  secondary: {
    fontSize: '0.75rem',
    marginRight: theme.spacing(1),
  },
}));

type DashboardLabelTileProps = {
  item: DashboardLabelItem;
  onEdit?: (item: DashboardItem) => void;
  onDelete?: (item: DashboardItem) => void;
};

const DashboardLabelTile: FunctionComponent<DashboardLabelTileProps> = ({ item, onEdit, onDelete }) => {
  const classes = useStyles();
  const [isItemEditing, setIsItemEditing] = useState(false);

  const handleOnEdit = () => setIsItemEditing(value => !value);

  const content = (
    <>
      <Typography className={classes.primary}>{item.title}</Typography>
      <Typography className={classes.secondary}>{item.subTitle}</Typography>
    </>
  );

  if (!onEdit) {
    return (
      <ConnectionDashboardTileBase className={classes.root} item={item}>
        {content}
      </ConnectionDashboardTileBase>
    );
  }

  return (
    <>
      <ConnectionDashboardTileEditBase
        className={classes.root}
        item={item}
        onEdit={onEdit}
        onItemEdit={handleOnEdit}
      >
        {content}
      </ConnectionDashboardTileEditBase>
      <ConnectionDashboardLabelTileEdit
        isOpen={isItemEditing}
        onClose={handleOnEdit}
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

export default DashboardLabelTile;
