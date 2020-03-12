import { useContext, useEffect, useState } from 'react';

import { Connection } from '../../models';

import context from '../../contexts/connection';

const useConnection = (name: string) => {
  const { connections } = useContext(context);
  const [connection, setConnection] = useState<Connection>();

  useEffect(() => {
    setConnection(connections.filter(c => c.name === name)[0]);
  }, [name]);

  return connection;
};

export default useConnection;
