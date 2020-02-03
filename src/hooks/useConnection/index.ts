import { useRouter } from 'next/router';

import { getConnection } from '../../gateways/settings';
import { useState, useEffect } from 'react';

const useConnection = () => {
  const connectionName = useRouter().query['connection-name']
  const [connection, setConnection] = useState();

  useEffect(() => {
    setConnection(getConnection(connectionName as string))
  }, [connectionName]);

  return connection;
};

export default useConnection;
