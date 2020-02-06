import { FunctionComponent, useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Theme, makeStyles } from '@material-ui/core';

import ConnectionDashboardPlaceholder from './_placeholder';
import { Dashboard, DashboardItem } from '../../../models';
import ConnectionDashboardTileDrawer from './_tile-drawer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: 0,
  },
  editing: {
    flexGrow: 1,
    overflow: 'scroll',
  },
  scrollable: {
    display: 'grid',
    gridGap: '4px',
    gridAutoFlow: 'dense',
    gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
    gridAutoRows: 'minmax(60px, auto)',
    width: 3840 - 64,
    height: 2160 - 236,
  },
}));

type ConnectionDashboardContainerEditProps = {
  dashboard: Dashboard | undefined;
  onDrop: (item: DashboardItem) => void;
};

const ConnectionDashboardContainerEdit: FunctionComponent<ConnectionDashboardContainerEditProps> = ({
  dashboard,
}) => {
  const classes = useStyles();
  const [editingLayout, setEdditingLayout] = useState();

  useEffect(() => {
    const placeholders = new Array(59 * 30).fill(undefined);
    setEdditingLayout(
      placeholders.map((_, i) => {
        const row = Math.floor((i + 1) / 60) + 1; // the 60 is weird but it works
        const column = i + 1 - (row - 1) * 59;

        return <ConnectionDashboardPlaceholder key={i} row={row} column={column} />;
      })
    );
  }, [dashboard]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.root}>
        <ConnectionDashboardTileDrawer />
        <div className={classes.editing}>
          <div className={classes.scrollable}>{editingLayout}</div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ConnectionDashboardContainerEdit;
