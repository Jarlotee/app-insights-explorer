import { FunctionComponent, useState, useEffect, useRef } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import {
  LineChart,
  Legend,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from 'recharts';

import { format, parseISO } from 'date-fns';

import { ApplicationInsightsResponse } from '../../../models';

const colors = ['#FAE700', '#FFD900', '#FFC000', '#FFA700', '#FE7A00'];

const useStyles = makeStyles((theme: Theme) => ({
  pieContainer: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'auto',
    justifyContent: 'center',
  },
}));

type ConnectionQueryLineProps = {
  results?: ApplicationInsightsResponse;
};

const ConnectionQueryLine: FunctionComponent<ConnectionQueryLineProps> = ({ results }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (results && results.tables && results.tables.length > 0) {
      const formatted = results.tables[0].rows.map(row => {
        const map = {
          name: parseISO(row[0]).getTime(),
          [results.tables[0].columns[1].name]: row[1],
        };

        for (let i = 2; i < results.tables[0].columns.length; i++) {
          map[results.tables[0].columns[i].name] = row[i];
        }

        return map;
      });

      const sorted = formatted.sort((a, b) => a.name - b.name);

      setData(sorted);
    }
  }, [results]);

  let lines = [];

  const tickFormatter = name => {
    return format(new Date(name), 'M/d h:mm:ss a');
  };

  if (results && results.tables && results.tables.length > 0) {
    for (let i = 1; i < results.tables[0].columns.length; i++) {
      lines.push(results.tables[0].columns[i].name);
    }
  }

  const dynamicHeight = containerRef.current ? containerRef.current.clientHeight - 5 : 0;

  return (
    <div className={classes.pieContainer} ref={containerRef}>
      <ResponsiveContainer height={dynamicHeight}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            interval="preserveStart"
            dataKey="name"
            stroke="#FFFFFF"
            tickFormatter={tickFormatter}
            minTickGap={25}
          />
          <YAxis width={24} stroke="#FFFFFF" />
          <Legend verticalAlign="top" height={32} />
          <Tooltip
            contentStyle={{ backgroundColor: '#2A343D', border: 'none' }}
            labelFormatter={tickFormatter}
          />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line}
              stroke={colors[index % colors.length]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConnectionQueryLine;
