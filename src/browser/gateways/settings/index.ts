import { Connection } from '../../models';

export const saveConnection = (connection: Connection) => {
  const { name } = connection;

  const connections = JSON.parse(localStorage.getItem('connections') || '{}');
  connections[name] = connection;
  localStorage.setItem('connections', JSON.stringify(connections));
};

export const getConnections = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const connections = JSON.parse(localStorage.getItem('connections') || '{}');

  const mapped = Object.keys(connections).map<Connection>(k => ({
    name: k,
    id: connections[k].id,
    key: connections[k].key,
  }));

  return mapped;
};

export const getConnection = (name: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  const connections = JSON.parse(localStorage.getItem('connections') || '{}');
  return connections[name];
};
