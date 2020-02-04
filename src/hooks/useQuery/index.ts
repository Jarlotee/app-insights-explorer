import { useState, useEffect } from 'react';

import { runQuery } from '../../gateways/app-insights';

import { Connection, ApplicationInsightsResponse } from '../../models';

import { addQueryHistory } from '../../gateways/settings';

const useQuery = (connection: Connection) => {
  const [query, setQuery] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [results, setResults] = useState<ApplicationInsightsResponse | undefined>();
  const [isRunning, setIsRunning] = useState<boolean>(false);

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
  }, [connection, query]);

  return { query, setQuery, error, isRunning, results };
};

export default useQuery;
