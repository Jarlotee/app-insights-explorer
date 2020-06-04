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
  const [connection, setConnection] = useState<Connection>();
  const [connections, setConnections] = useState<Connection[]>();

  useEffect(() => {
    setConnection(getDefaultConnection());
    setConnections(getConnections());
  }, []);

  // handle syncing default
  useEffect(() => {
    if(connections && connections.length && !!connection) {
      const foundConnection = connections.filter(c => connection.name === name)[0];

      if(foundConnection && !foundConnection.default) {
        const updatedConnections = connections.map(c => ({
          ...{ default: c.name === connection.name },
          ...c,
        }));
        setConnections(updatedConnections);
      }
    }
  }, [connection, connections]);

  // persistent changes if we have them
  useEffect(() => {
    if(connections && connections.length) {
      saveConnections(connections);
    }
  }, [connections]);

  const onChange = (name: string) => {
    const foundConnection = connections.filter(c => c.name === name)[0];

    if (foundConnection) {
      setConnection(foundConnection);
    }
  };

  const onSave = (newConnection: Connection) => {
    setConnections([...[newConnection], ...connections]);
    setConnection(newConnection);
  };

  return (
    <Context.Provider value={{ connection, connections, onChange, onSave }}>
      {children}
    </Context.Provider>
  );
};

export default ConnectionContextProvider;
