import { FunctionComponent, CSSProperties, useRef } from 'react';

import classnames from 'classnames';

import { Paper, makeStyles, Theme } from '@material-ui/core';

import { DashboardItem } from '../../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 2,
  },
  paper: {
    flexGrow: 1,
  },
}));

type ConnectionDashboardTileBaseProps = {
  className?: string;
  item: DashboardItem;
};

const ConnectionDashboardTileBase: FunctionComponent<ConnectionDashboardTileBaseProps> = ({
  children,
  className,
  item,
}) => {
  const classes = useStyles();

  const classNames = classnames(className, classes.paper);

  const style: CSSProperties = {
    gridColumnStart: item.anchor.column,
    gridColumnEnd: item.anchor.column + item.width,
    gridRowStart: item.anchor.row,
    gridRowEnd: item.anchor.row + item.height,
  };

  return (
    <div className={classes.root} style={style}>
      <Paper className={classNames}>{children}</Paper>
    </div>
  );
};

export default ConnectionDashboardTileBase;
