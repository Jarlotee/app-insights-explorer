import { FunctionComponent, useState } from 'react';

import { Typography, makeStyles, Theme } from '@material-ui/core';

import { DashboardLabelItem } from '../../../../models';

import DashboardTileBase from '../base';
import DashboardTileEditBase from '../edit-base';
import DashboardLabelTileEdit from './_edit';

import useDashboardContext from '../../../../hooks/useDashboardContext';

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
};

const DashboardLabelTile: FunctionComponent<DashboardLabelTileProps> = ({ item }) => {
  const classes = useStyles();
  const [isItemEditing, setIsItemEditing] = useState<boolean>(false);

  const { isEditing } = useDashboardContext();

  const handleOnEdit = () => setIsItemEditing(value => !value);

  const content = (
    <>
      <Typography className={classes.primary}>{item.title}</Typography>
      <Typography className={classes.secondary}>{item.subTitle}</Typography>
    </>
  );

  if (!isEditing) {
    return (
      <DashboardTileBase className={classes.root} item={item}>
        {content}
      </DashboardTileBase>
    );
  }

  return (
    <>
      <DashboardTileEditBase
        className={classes.root}
        item={item}
        onEdit={handleOnEdit}
      >
        {content}
      </DashboardTileEditBase>
      <DashboardLabelTileEdit
        isOpen={isItemEditing}
        onClose={handleOnEdit}
        item={item}
      />
    </>
  );
};

export default DashboardLabelTile;
