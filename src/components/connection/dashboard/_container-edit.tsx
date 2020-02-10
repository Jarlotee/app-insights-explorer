import { FunctionComponent, useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Theme, makeStyles } from '@material-ui/core';

import ConnectionDashboardPlaceholder from './_placeholder';
import { Dashboard, DashboardItem } from '../../../models';
import ConnectionDashboardTileDrawer from './_tile-drawer';
import { ItemTypes } from './_constants';
import DashboardLabelTile from './tiles/label';

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
    gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 60px))',
    gridAutoRows: 'minmax(60px, 60px)',
    width: 3840 - 64,
    height: 2160 - 236,
  },
}));

type ConnectionDashboardContainerEditProps = {
  dashboard: Dashboard | undefined;
  onDrop: (item: DashboardItem, anchor: number) => void;
  onResize: (item: DashboardItem) => void;
};

const ConnectionDashboardContainerEdit: FunctionComponent<ConnectionDashboardContainerEditProps> = ({
  dashboard,
  onDrop,
  onResize
}) => {
  const classes = useStyles();
  const [editingLayout, setEdditingLayout] = useState();

  useEffect(() => {
    if (dashboard) {
      console.log('dashboard', dashboard);

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
        const index = item.anchor;
        const row = Math.ceil(index / 59);
        const column = index - (row - 1) * 59;

        switch (item.type) {
          case ItemTypes.label:
            return <DashboardLabelTile key={placeholders.length + 1 + i} item={item} row={row} column={column} onResize={onResize} />;
          default:
            return <div>Unmapped Items [{item.type}]</div>;
        }
      });

      setEdditingLayout([...placeholders, ...tiles]);
    }
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
