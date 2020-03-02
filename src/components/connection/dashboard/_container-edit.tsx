import { FunctionComponent, useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Theme, makeStyles } from '@material-ui/core';

import ConnectionDashboardPlaceholder from './_placeholder';
import { Dashboard, DashboardItem, DashboardCoordinate } from '../../../models';
import ConnectionDashboardTileDrawer from './_tile-drawer';
import mapItemToTile from './_tile-mapper';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: 0,
  },
  editing: {
    flexGrow: 1,
    overflow: 'auto',
  },
  scrollable: {
    display: 'grid',
    gridGap: '4px',
    gridAutoFlow: 'dense',
    gridTemplateColumns: 'repeat(auto-fill, 60px)',
    gridTemplateRows: 'repeat(auto-fill, 60px)',
    width: 3840 - 64,
    height: 2160 - 236,
  },
}));

type ConnectionDashboardContainerEditProps = {
  dashboard: Dashboard | undefined;
  onDrop: (item: DashboardItem, anchor: DashboardCoordinate) => void;
  onEdit: (item: DashboardItem) => void;
  onDelete: (item: DashboardItem) => void;
};

const ConnectionDashboardContainerEdit: FunctionComponent<ConnectionDashboardContainerEditProps> = ({
  dashboard,
  onDrop,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles();
  const [editingLayout, setEdditingLayout] = useState();

  useEffect(() => {
    if (dashboard) {
      const positions = new Array(59 * 30).fill(undefined);

      const placeholders = positions.map((_, i) => {
        const index = i + 1;
        const row = Math.ceil(index / 59);
        const column = index - (row - 1) * 59;

        return (
          <ConnectionDashboardPlaceholder
            key={index}
            row={row}
            column={column}
            onDrop={onDrop}
            index={index}
          />
        );
      });

      const tiles = dashboard.items.map((item, i) => {
        return mapItemToTile(item, placeholders.length + 1 + i, onEdit, onDelete);
      });

      setEdditingLayout([...placeholders, ...tiles]);
    }
  }, [dashboard]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="dashboard-body-edit" className={classes.root}>
        <ConnectionDashboardTileDrawer />
        <div className={classes.editing}>
          <div className={classes.scrollable}>{editingLayout}</div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ConnectionDashboardContainerEdit;
