import { FunctionComponent, useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Theme, makeStyles } from '@material-ui/core';

import DashboardPlaceholder from './_placeholder';
import DashboardTileDrawer from './_tile-drawer';
import DashboardDragLayer from './_drag-layer';

import mapItemToTile from './_tile-mapper';
import useDashboardContext from '../../hooks/useDashboardContext';

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

type DashboardContainerEditProps = {};

const DashboardContainerEdit: FunctionComponent<DashboardContainerEditProps> = ({}) => {
  const classes = useStyles();
  const [editingLayout, setEditingLayout] = useState<JSX.Element[]>();
  const { dashboard } = useDashboardContext();

  useEffect(() => {
    if (dashboard) {
      const positions = new Array(59 * 30).fill(undefined);

      const placeholders = positions.map((_, i) => {
        const index = i + 1;
        const row = Math.ceil(index / 59);
        const column = index - (row - 1) * 59;

        return (
          <DashboardPlaceholder
            key={index}
            row={row}
            column={column}
            index={index}
          />
        );
      });

      const tiles = dashboard.items.map((item, i) => {
        return mapItemToTile(item, placeholders.length + 1 + i);
      });

      setEditingLayout([...placeholders, ...tiles]);
    }
  }, [dashboard]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="dashboard-body-edit" className={classes.root}>
        <DashboardTileDrawer />
        <div className={classes.editing}>
          <div className={classes.scrollable}>
            {<DashboardDragLayer />}
            {editingLayout}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DashboardContainerEdit;
