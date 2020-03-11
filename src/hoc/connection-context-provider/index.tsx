import { useState, useEffect } from 'react';

import { getConnection, getConnections, saveConnection } from '../../gateways/settings';

import { Connection } from '../../models';

import Context from '../../contexts/connection';

const getDefaultConnection = () => {
  const connections = getConnections();

  if (connections.length === 0) {
    return null;
  }

  return connections.filter(c => c.default)[0] || connections[0];
};

const ConnectionContextProvider = ({ children }) => {
  const defaultConnection = getDefaultConnection();
  const [connection, setConnection] = useState<Connection>();
  const [connections, setConnections] = useState<Connection[]>();

  useEffect(() => {
    setConnection(defaultConnection);
    setConnections(getConnections());
  }, []);

  const onChange = (name: string) => {
    const foundConnection = getConnection(name);

    if (foundConnection) {
      saveConnection({ ...{ default: true }, ...foundConnection });
      setConnection(foundConnection);
    }
  };

  const onSave = (newConnection: Connection) => {
    saveConnection({ ...{ default: true }, ...newConnection });
    setConnections(getConnections());
    setConnection(newConnection);
  };

  return (
    <Context.Provider value={{ connection, connections, onChange, onSave }}>
      {children}
    </Context.Provider>
  );
};

export default ConnectionContextProvider;
