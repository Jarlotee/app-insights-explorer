import { FunctionComponent, useState } from 'react';

import { Typography, makeStyles, Theme } from '@material-ui/core';

import ConnectionDashboardTileBase from '../base';

import { DashboardItem, DashboardLabelItem } from '../../../../../models';

import ConnectionDashboardLabelTileEdit from './_edit';

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
  row: number;
  column: number;
  onEdit: (item: DashboardItem) => void;
};

const DashboardLabelTile: FunctionComponent<DashboardLabelTileProps> = ({
  item,
  row,
  column,
  onEdit,
}) => {
  const classes = useStyles();
  const [isItemEditing, setIsItemEditing] = useState(false);

  const handleOnEdit = () => setIsItemEditing(value => !value);

  return (
    <>
      <ConnectionDashboardTileBase
        className={classes.root}
        item={item}
        row={row}
        column={column}
        onEdit={onEdit}
        onItemEdit={handleOnEdit}
      >
        <Typography className={classes.primary}>{item.primaryText}</Typography>
        <Typography className={classes.secondary}>{item.secondaryText}</Typography>
      </ConnectionDashboardTileBase>
      <ConnectionDashboardLabelTileEdit
        isOpen={isItemEditing}
        onClose={handleOnEdit}
        item={item}
        onEdit={onEdit}
      />
    </>
  );
};

export default DashboardLabelTile;
