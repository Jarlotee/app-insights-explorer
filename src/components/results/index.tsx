import { FunctionComponent } from 'react';

import dynamic from 'next/dynamic';

import { ApplicationInsightsResponse } from '../../models';

type ResultsProps = {
  query: string;
  results: ApplicationInsightsResponse;
};

const Results: FunctionComponent<ResultsProps> = ({ query, results }) => {
  if (!results) {
    return null;
  }

  if (query && query.match(/\|\s+render\s+piechart\s*$/i)) {
    const PieGraph = dynamic(() => import('./_pie'), { ssr: false });
    return <PieGraph results={results} />;
  } else if (query && query.match(/\|\s+render\s+timechart\s*$/i)) {
    const LineGraph = dynamic(() => import('./_line'), { ssr: false });
    return <LineGraph results={results} />;
  } else {
    const Table = dynamic(() => import('./_table'), { ssr: false });
    return <Table results={results} />;
  }
};

export default Results;
