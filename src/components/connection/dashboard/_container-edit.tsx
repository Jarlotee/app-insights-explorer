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
    gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
    gridAutoRows: 'minmax(60px, auto)',
    width: 3840 - 64,
    height: 2160 - 236,
  },
}));

type ConnectionDashboardContainerEditProps = {
  dashboard: Dashboard | undefined;
  onDrop: (item: DashboardItem, anchor: number) => void;
};

const ConnectionDashboardContainerEdit: FunctionComponent<ConnectionDashboardContainerEditProps> = ({
  dashboard,
  onDrop,
}) => {
  const classes = useStyles();
  const [editingLayout, setEdditingLayout] = useState();

  useEffect(() => {
    if (dashboard) {
      console.log('dashboard', dashboard);

      const positions = new Array(59 * 30).fill(undefined);
      const takenPosition = dashboard.items.map(i => i.positions).reduce((a, b) => [...a, ...b], []);

      const layout = positions.map((_, i) => {
        const index = i + 1;
        const row = Math.ceil(index / 59); // the 60 is weird but it works
        const column = index - (row - 1) * 59;

        const items = dashboard.items.filter(item => item.anchor === index);

        if (items.length) {
          const item = items[0];

          switch (item.type) {
            case ItemTypes.label:
              return <DashboardLabelTile key={index} item={item} />;
          }
        }

        if (takenPosition.indexOf(index) > -1) {
          return null;
        }

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

      setEdditingLayout(layout);
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
