import { useState, useEffect } from 'react';

import { runQuery } from '../../gateways/app-insights';

import { Connection, ApplicationInsightsResponse } from '../../models';

import { addQueryHistory } from '../../gateways/settings';

const useQuery = (connection: Connection, initialQuery: string = undefined) => {
  const [query, setQuery] = useState<string | undefined>(initialQuery);
  const [queryTimeStamp, setQueryTimeStamp] = useState<Date>(new Date());
  const [error, setError] = useState<string | undefined>();
  const [results, setResults] = useState<ApplicationInsightsResponse | undefined>();
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleQueryChange = (query: string) => {
    setQuery(query);
    setQueryTimeStamp(new Date());
  };

  useEffect(() => {
    const handle = async () => {
      if (!connection || typeof query === 'undefined') {
        return;
      }

      if (query.match(/^\s*$/)) {
        setError('No Query was specified.');
        return;
      }

      try {
        setIsRunning(true);
        setError(undefined);
        const response = await runQuery(connection.id, connection.key, query);
        if (response.ok) {
          setResults(await response.json());
          addQueryHistory(connection.name, query);
        } else {
          const json = await response.json();
          let error = json.error;
          while (error.innererror) {
            error = error.innererror;
          }
          setError(error.message);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsRunning(false);
      }
    };

    handle();
  }, [connection, query, queryTimeStamp]);

  return { query, setQuery: handleQueryChange, error, isRunning, results, queryTimeStamp };
};

export default useQuery;
