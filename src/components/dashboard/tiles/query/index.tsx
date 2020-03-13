import { FunctionComponent, useState } from 'react';

import { format } from 'date-fns';

import { makeStyles, Theme, Typography, LinearProgress } from '@material-ui/core';

import { DashboardQueryItem } from '../../../../models';

import DashboardTileBase from '../base';
import DashboardTileEditBase from '../edit-base';
import DashboardQueryTileEdit from './_edit';
import Results from '../../../results';

import useConnection from '../../../../hooks/useConnection';
import useQuery from '../../../../hooks/useQuery';
import useDashboardContext from '../../../../hooks/useDashboardContext';

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
};

const DashboardQueryTile: FunctionComponent<DashboardLabelTileProps> = ({ item }) => {
  const classes = useStyles();
  const [isItemEditing, setIsItemEditing] = useState(false);
  const connection = useConnection(item.connection);
  const { error, isRunning, results, queryTimeStamp } = useQuery(connection, item.query);
  const { isEditing } = useDashboardContext();

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
  } else if (!connection) {
    content = (
      <>
        <Typography className={classes.title}>{item.title}</Typography>
        <div className={classes.divider} />
        <Typography className={classes.error}>Please set a connection for this query</Typography>
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
        <Results query={item.query} results={results} />
      </>
    );
  }

  if (!isEditing) {
    return (
      <DashboardTileBase className={classes.root} item={item}>
        {content}
      </DashboardTileBase>
    );
  }

  return (
    <>
      <DashboardTileEditBase className={classes.root} item={item} onEdit={handleOnEdit}>
        {content}
      </DashboardTileEditBase>
      <DashboardQueryTileEdit isOpen={isItemEditing} onClose={handleOnEdit} item={item} />
    </>
  );
};

export default DashboardQueryTile;
