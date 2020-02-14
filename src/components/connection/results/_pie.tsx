import { FunctionComponent, useState, useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import { VictoryPie, VictoryStyleInterface, AnimatePropTypeInterface } from 'victory';

import { ApplicationInsightsResponse } from '../../../models';

const percentFormatter = new Intl.NumberFormat('en-US', { style: 'percent' });

const styles: VictoryStyleInterface = {
  labels: { fill: '#FFFFFF', fontSize: '10px' },
  parent: { width: '75vh' },
};

const scale = ['#FAE700', '#FFD900', '#FFC000', '#FFA700', '#FE7A00'];

const useStyles = makeStyles((theme: Theme) => ({
  pieContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

type ConnectionQueryPieProps = {
  results?: ApplicationInsightsResponse;
};

const ConnectionQueryPie: FunctionComponent<ConnectionQueryPieProps> = ({ results }) => {
  const classes = useStyles();
  const [data, setData] = useState([{ y: 1, x: ' ' }]);

  useEffect(() => {
    if (results && results.tables && results.tables.length > 0) {
      const total = results.tables[0].rows.map(r => parseInt(r[1])).reduce((a, b) => a + b);

      const formatted = results.tables[0].rows.map(row => ({
        x: `${row[0] || '[empty]'} (${percentFormatter.format(row[1] / total)})`,
        y: row[1],
      }));

      setData(formatted);
    }
  }, [results]);

  return (
    <div className={classes.pieContainer}>
      <VictoryPie
        data={data}
        colorScale={scale}
        style={styles}
        width={500}
        height={300}
        animate={{ duration: 250, easing: 'exp' }}
      />
    </div>
  );
};

export default ConnectionQueryPie;
