import { useState, useEffect } from 'react';

import { getConnections, saveConnections } from '../../gateways/settings';

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

  const syncConnections = () => {
    if (!!connection) {
      const updatedConnections = connections.map(c => ({
        ...{ default: c.name === connection.name },
        ...c,
      }));
      setConnections(updatedConnections);
      saveConnections(updatedConnections);
    } else {
      saveConnections(connections);
    }
  };

  const onChange = (name: string) => {
    const foundConnection = connections.filter(c => c.name === name)[0];

    if (foundConnection) {
      setConnection(foundConnection);
      syncConnections();
    }
  };

  const onSave = (newConnection: Connection) => {
    setConnections([...[newConnection], ...connections]);
    setConnection(newConnection);
    syncConnections();
  };

  return (
    <Context.Provider value={{ connection, connections, onChange, onSave }}>
      {children}
    </Context.Provider>
  );
};

export default ConnectionContextProvider;
