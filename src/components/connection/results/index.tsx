import { FunctionComponent } from 'react';

import dynamic from 'next/dynamic';

import { ApplicationInsightsResponse } from '../../../models';

type ConnectionResultsProps = {
  query: string;
  results: ApplicationInsightsResponse;
};

const ConnectionResults: FunctionComponent<ConnectionResultsProps> = ({ query, results }) => {
  if (!results) {
    return null;
  }

  if (query && query.match(/\|\s+render\s+piechart\s*$/i)) {
    const ConnectionQueryPie = dynamic(() => import('./_pie'), { ssr: false });
    return <ConnectionQueryPie results={results} />;
  } else {
    const ConnectionQueryTable = dynamic(() => import('./_table'), { ssr: false });
    return <ConnectionQueryTable results={results} />;
  }
};

export default ConnectionResults;
