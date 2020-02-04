import { FunctionComponent } from 'react';

import {
  makeStyles,
  Theme,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
} from '@material-ui/core';

import { ApplicationInsightsResponse } from '../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  results: {
    margin: theme.spacing(2, 0),
    flexGrow: 1,
  },
}));

type ConnectionQueryTableProps = {
  results?: ApplicationInsightsResponse;
};

const ConnectionQueryTable: FunctionComponent<ConnectionQueryTableProps> = ({ results }) => {
  const classes = useStyles();
  let tcolumns = null;
  let trows = null;

  if (results && results.tables && results.tables[0]) {
    tcolumns = results.tables[0].columns.map((c, i) => (
      <TableCell key={i} align={i === 0 ? 'left' : 'right'}>
        {c.name}
      </TableCell>
    ));

    trows = results.tables[0].rows.map((r, i) => (
      <TableRow key={i}>
        {r.map((v, j) => (
          <TableCell key={j} align={j === 0 ? 'left' : 'right'}>
            {v}
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  return (
    <TableContainer className={classes.results}>
      <Table size="small">
        <TableHead>
          <TableRow>{tcolumns}</TableRow>
        </TableHead>
        <TableBody>{trows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConnectionQueryTable;
