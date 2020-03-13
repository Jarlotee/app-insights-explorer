import { FunctionComponent, useState, useEffect, CSSProperties, ReactElement } from 'react';

import { Theme, makeStyles } from '@material-ui/core';

import mapItemToTile from './_tile-mapper';
import useDashboardContext from '../../hooks/useDashboardContext';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: 0,
    overflow: 'auto',
  },
  layout: {
    flexShrink: 0,
    display: 'grid',
    gridGap: '4px',
    gridAutoFlow: 'dense',
    gridTemplateColumns: 'repeat(auto-fill, 60px)',
    gridTemplateRows: 'repeat(auto-fill, 60px)',
  },
}));

type DashboardContainerDisplayProps = {};

const DashboardContainerDisplay: FunctionComponent<DashboardContainerDisplayProps> = ({}) => {
  const classes = useStyles();
  const [styles, setStyles] = useState<CSSProperties>();
  const [layout, setLayout] = useState<JSX.Element[]>();

  const { dashboard } = useDashboardContext();

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

      setStyles({
        width: `${columns * 64}px`,
        height: `${rows * 64}px`,
      });

      const tiles = dashboard.items.map((item, i) => {
        return mapItemToTile(item, i);
      });

      setLayout(tiles);
    } else {
      setLayout([]);
    }
  }, [dashboard]);

  return (
    <div id="dashboard-body-dispay" className={classes.root}>
      <div className={classes.layout} style={styles}>
        {layout}
      </div>
    </div>
  );
};

export default DashboardContainerDisplay;
