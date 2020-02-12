import { FunctionComponent, useState, useEffect, CSSProperties } from 'react';

import { Theme, makeStyles } from '@material-ui/core';

import { Dashboard } from '../../../models';
import mapItemToTile from './_tile-mapper';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: 0,
  },
  layout: {
    display: 'grid',
    gridGap: '4px',
    gridAutoFlow: 'dense',
    gridTemplateColumns: 'repeat(auto-fill, 60px)',
    gridTemplateRows: 'repeat(auto-fill, 60px)',
  },
}));

type ConnectionDashboardContainerDisplayProps = {
  dashboard: Dashboard | undefined;
};

const ConnectionDashboardContainerDisplay: FunctionComponent<ConnectionDashboardContainerDisplayProps> = ({
  dashboard,
}) => {
  const classes = useStyles();
  const [styles, setStyles] = useState<CSSProperties>();
  const [layout, setLayout] = useState();

  useEffect(() => {
    if (dashboard) {
      let columns = 0;
      let rows = 0;

      dashboard.items.forEach(item => {
        const farthestColumn = item.anchor.column + item.width;
        const farthestRow = item.anchor.row + item.height;

        columns = farthestColumn > columns ? farthestColumn : columns;
        rows = farthestRow > rows ? farthestRow : rows;
      });

      console.log('debug', columns, rows)

      setStyles({
        width: `${columns * 64}px`,
        height: `${rows * 64}px`,
      });

      const tiles = dashboard.items.map((item, i) => {
        return mapItemToTile(item, i);
      });

      setLayout(tiles);
    }
  }, [dashboard]);

  return (
    <div className={classes.root}>
      <div className={classes.layout} style={styles}>
        {layout}
      </div>
    </div>
  );
};

export default ConnectionDashboardContainerDisplay;
