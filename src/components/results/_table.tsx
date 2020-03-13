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

import { ApplicationInsightsResponse } from '../../models';

const useStyles = makeStyles((theme: Theme) => ({
  results: {
    flexGrow: 1,
  },
  item: {
    padding: theme.spacing(0.5, 2, 0.5, 1),
    "&:first-of-type" : {
      paddingLeft: theme.spacing(0)
    }
  },
}));

type ResultsTableProps = {
  title?: string;
  results?: ApplicationInsightsResponse;
};

const ResultsTable: FunctionComponent<ResultsTableProps> = ({ title, results }) => {
  const classes = useStyles();
  let tcolumns = null;
  let trows = null;

  if (results && results.tables && results.tables[0]) {
    tcolumns = results.tables[0].columns.map((c, i) => (
      <TableCell key={i} className={classes.item} align={i === 0 ? 'left' : 'right'}>
        {c.name}
      </TableCell>
    ));

    trows = results.tables[0].rows.map((r, i) => (
      <TableRow key={i}>
        {r.map((v, j) => (
          <TableCell key={j} className={classes.item} align={j === 0 ? 'left' : 'right'}>
            {v}
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  return (
    <TableContainer className={classes.results}>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>{tcolumns}</TableRow>
        </TableHead>
        <TableBody>{trows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;
