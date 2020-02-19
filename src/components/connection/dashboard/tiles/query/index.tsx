import { FunctionComponent, useState } from 'react';

import { format } from 'date-fns';

import { makeStyles, Theme, Typography, LinearProgress } from '@material-ui/core';

import ConnectionDashboardTileEditBase from '../edit-base';

import { DashboardItem, DashboardQueryItem } from '../../../../../models';

import ConnectionDashboardTileBase from '../base';
import ConnectionResults from '../../../results';
import useConnection from '../../../../../hooks/useConnection';
import useQuery from '../../../../../hooks/useQuery';
import ConnectionDashboardQueryTileEdit from './_edit';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1, 2),
    position: 'relative',
    overflow: 'auto',
  },
  title: {
    fontSize: '1.25rem',
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: '0.75rem',
    marginRight: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  divider: {
    height: '1px',
    margin: theme.spacing(0.75, 0),
    width: '100%',
    backgroundColor: '#3e464f',
  },
  error: {
    color: 'red',
  },
}));

type DashboardLabelTileProps = {
  item: DashboardQueryItem;
  onEdit?: (item: DashboardItem) => void;
  onDelete?: (item: DashboardItem) => void;
};

const DashboardQueryTile: FunctionComponent<DashboardLabelTileProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles();
  const [isItemEditing, setIsItemEditing] = useState(false);
  const connection = useConnection();
  const { error, isRunning, results, queryTimeStamp } = useQuery(connection, item.query);

  const handleOnEdit = () => setIsItemEditing(value => !value);

  let content = null;

  if (isRunning) {
    content = (
      <>
        <Typography className={classes.title}>{item.title}</Typography>
        <LinearProgress className={classes.loading} />
      </>
    );
  } else if (error) {
    content = (
      <>
        <Typography className={classes.title}>{item.title}</Typography>
        <div className={classes.divider} />
        <Typography className={classes.error}>{error}</Typography>
      </>
    );
  } else {
    content = (
      <>
        <Typography className={classes.title}>{item.title}</Typography>
        <Typography className={classes.subtitle}>
          {format(queryTimeStamp, 'hh:mm:ss aa')}
        </Typography>
        <div className={classes.divider} />
        <ConnectionResults query={item.query} results={results} />
      </>
    );
  }

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
      <ConnectionDashboardQueryTileEdit
        isOpen={isItemEditing}
        onClose={handleOnEdit}
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

export default DashboardQueryTile;
