import { FunctionComponent, useState, useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import { ApplicationInsightsResponse } from '../../../models';

const colors = ['#FAE700', '#FFD900', '#FFC000', '#FFA700', '#FE7A00'];

const useStyles = makeStyles((theme: Theme) => ({
  pieContainer: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'scroll',
    justifyContent: 'center',
  },
}));

type ConnectionQueryPieProps = {
  results?: ApplicationInsightsResponse;
};

const ConnectionQueryPie: FunctionComponent<ConnectionQueryPieProps> = ({ results }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (results && results.tables && results.tables.length > 0) {
      const formatted = results.tables[0].rows.map(row => ({
        name: row[0] || '[empty]',
        value: row[1],
      }));

      setData(formatted);
    }
  }, [results]);

  return (
    <div className={classes.pieContainer}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} outerRadius={120}>
            {data.map((_, index) => {
              return <Cell key={index} fill={colors[index % colors.length]} strokeOpacity={0} />;
            })}
          </Pie>
          <Legend layout="vertical" verticalAlign="middle" align="right" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConnectionQueryPie;
